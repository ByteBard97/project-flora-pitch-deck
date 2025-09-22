import { Tool } from "@modelcontextprotocol/sdk/types";
import { Server } from "@modelcontextprotocol/sdk/server";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

type Action =
  | "STUDY_ORIGINAL"
  | "CREATE_OR_FIX_VUE"
  | "SNAP_HD"
  | "VERIFY"
  | "DOUBLE_CHECK"
  | "FINALIZE";
type SlideState = {
  slide: number;
  status: "todo" | "wip" | "done";
  lastAction?: Action;
  name?: string;
  notes?: string[];
  screenshot?: string;
  doubleChecksRemaining?: number; // set per slide in state.json
};
type State = { slides: SlideState[] };

const ROOT = process.env.FLORA_ROOT || path.resolve(process.cwd(), ".."); // project root
const STATE_PATH = path.join(ROOT, "automation/state.json");

function loadState(): State {
  if (!fs.existsSync(STATE_PATH)) throw new Error(`Missing ${STATE_PATH}`);
  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
}
function saveState(s: State) {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, JSON.stringify(s, null, 2));
}
function rowFor(s: State, slide: number) {
  const r = s.slides.find((x) => x.slide === slide);
  if (!r) throw new Error(`Slide ${slide} not found`);
  return r;
}

function checks() {
  return [
    "All content visible (no clipping/overflow)",
    "Global background correct (no unintended black)",
    "Visual match to original (spacing/alignment/proportions)",
    "Readable typography at 1920×1080 and 1366×768",
    "Animations smooth and intentional",
  ];
}

function nextActionFor(last?: Action, remaining = 0): Action {
  if (!last) return "STUDY_ORIGINAL";
  if (last === "STUDY_ORIGINAL") return "CREATE_OR_FIX_VUE";
  if (last === "CREATE_OR_FIX_VUE") return "SNAP_HD";
  if (last === "SNAP_HD") return "VERIFY";
  if (last === "VERIFY") return remaining > 0 ? "DOUBLE_CHECK" : "FINALIZE";
  if (last === "DOUBLE_CHECK")
    return remaining > 0 ? "DOUBLE_CHECK" : "FINALIZE";
  return "FINALIZE";
}

function reminder(slideRow: SlideState, action: Action) {
  const slide = slideRow.slide;
  const remaining = slideRow.doubleChecksRemaining ?? 0;
  const name = slideRow.name ?? `${String(slide).padStart(2, "0")}.html`;
  const origHtml = path.join(ROOT, "extracted-slides", name);
  const snapsDir = path.join(ROOT, "screens");
  const snapCurrent = path.join(snapsDir, `slide${slide}-current.png`);
  const vuePath = path.join(ROOT, "layouts", `Slide${slide}.vue`);
  const mdPath = path.join(
    ROOT,
    "slides",
    `${String(slide).padStart(2, "0")}-*.md`
  );

  const base = `ITERATIVE LOOP — Slide ${slide} (double-checks remaining: ${remaining})
1) Study original (${origHtml})
2) Create/Fix Vue layout (${vuePath}) referenced by ${mdPath}
3) Take HD screenshot (${snapCurrent})
4) Verify against original + checklist
5) Repeat 2–4 until perfect → Finalize

Rules:
- No markdown-in-HTML; proper Vue structure.
- Fail fast; note missing assets and stop.
- Keep spacing/alignment faithful to original.`;

  const stepText: Record<Action, string> = {
    STUDY_ORIGINAL: `Do now:
- Open ${origHtml}; note structure/typography/spacing/assets.
Output:
- bullets: sections, fonts, spacing, assets.`,
    CREATE_OR_FIX_VUE: `Do now:
- Edit ${vuePath}; hook via ${mdPath}; ensure global background.
Output:
- paths changed + short diff summary.`,
    SNAP_HD: `Do now:
node ${path.join(ROOT, "tools", "snap.js")} --url "http://localhost:3030/${slide}" --out "${snapCurrent}" --width 1920 --height 1080 --wait 3000
Output:
- screenshot path.`,
    VERIFY: `Do now:
Compare to original. Checks:
- ${checks()
      .map((c) => "• " + c)
      .join("\n- ")}
Output:
- pass/fail per check + exact fixes if any.`,
    DOUBLE_CHECK: `Do now (ARE YOU REALLY SURE?):
- Re-run VERIFY from scratch; do NOT rely on memory.
- Test 1920×1080 and 1366×768.
- If any doubt: go back to CREATE_OR_FIX_VUE with concrete fixes.
Output:
- explicit pass/fail per check + found deltas.`,
    FINALIZE: `Do now:
- Copy ${snapCurrent} → ${path.join(snapsDir, `slide${slide}-final.png`)}; mark done.
Output:
- "Slide ${slide} complete."`,
  };

  return `${base}\n\nSTEP — ${action}\n${stepText[action]}`;
}

function run(cmd: string, cwd?: string) {
  return new Promise<{ code: number; out: string; err: string }>((resolve) => {
    const p = spawn(cmd, { shell: true, cwd });
    let out = "",
      err = "";
    p.stdout.on("data", (d) => (out += d.toString()));
    p.stderr.on("data", (d) => (err += d.toString()));
    p.on("close", (code) => resolve({ code: code ?? -1, out, err }));
  });
}

export function registerSlideWorkflow(server: Server) {
  const tools: Tool[] = [
    {
      name: "queue",
      description: "Show slide progress (1–13)",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "next_action",
      description: "Get next action + reminder for a slide",
      inputSchema: {
        type: "object",
        required: ["slide"],
        properties: { slide: { type: "number", minimum: 1, maximum: 13 } },
      },
    },
    {
      name: "record_result",
      description: "Record outcome and advance; returns the next reminder",
      inputSchema: {
        type: "object",
        required: ["slide", "status", "notes"],
        properties: {
          slide: { type: "number" },
          status: { type: "string", enum: ["ok", "needs_fixes"] },
          notes: { type: "string" },
          screenshot: { type: "string" },
        },
      },
    },
    {
      name: "snap",
      description: "Take HD screenshot via tools/snap.js",
      inputSchema: {
        type: "object",
        required: ["slide"],
        properties: {
          slide: { type: "number" },
          width: { type: "number", default: 1920 },
          height: { type: "number", default: 1080 },
          wait: { type: "number", default: 3000 },
          url: { type: "string" },
        },
      },
    },
    {
      name: "verify_snap",
      description: "Run tools/snap-full.js for a final verification shot",
      inputSchema: {
        type: "object",
        required: ["slide"],
        properties: {
          slide: { type: "number" },
          url: { type: "string" },
        },
      },
    },
    {
      name: "checklist",
      description: "Return verification checks",
      inputSchema: {
        type: "object",
        required: ["slide"],
        properties: { slide: { type: "number" } },
      },
    },
  ];

  // Register tools
  for (const t of tools) server.addTool?.(t);

  // Handlers
  server.on("queue", async () => {
    const s = loadState();
    const table = s.slides.map(
      ({ slide, status, lastAction, name, doubleChecksRemaining }) => ({
        slide,
        status,
        lastAction: lastAction ?? "-",
        checksRemaining: doubleChecksRemaining ?? 0,
        name,
      })
    );
    return {
      content: [{ type: "text", text: JSON.stringify(table, null, 2) }],
    };
  });

  server.on("next_action", async ({ input }) => {
    const { slide } = input as any;
    const s = loadState();
    const row = rowFor(s, slide);
    if (row.status === "done")
      return {
        content: [{ type: "text", text: `Slide ${slide} already complete.` }],
      };
    const action = nextActionFor(
      row.lastAction,
      row.doubleChecksRemaining ?? 0
    );
    return { content: [{ type: "text", text: reminder(row, action) }] };
  });

  server.on("record_result", async ({ input }) => {
    const { slide, status, notes, screenshot } = input as any;
    const s = loadState();
    const row = rowFor(s, slide);
    row.notes = [...(row.notes ?? []), notes];
    if (screenshot) row.screenshot = screenshot;

    if (row.status !== "done") {
      if (status === "ok") {
        if (
          row.lastAction === "VERIFY" &&
          (row.doubleChecksRemaining ?? 0) > 0
        ) {
          row.lastAction = "DOUBLE_CHECK";
          row.status = "wip";
        } else if (
          row.lastAction === "DOUBLE_CHECK" &&
          (row.doubleChecksRemaining ?? 0) > 0
        ) {
          row.doubleChecksRemaining = Math.max(
            0,
            (row.doubleChecksRemaining ?? 0) - 1
          );
          const nxt = nextActionFor(
            "DOUBLE_CHECK",
            row.doubleChecksRemaining ?? 0
          );
          if (nxt === "FINALIZE") {
            row.status = "done";
            row.lastAction = "FINALIZE";
          } else {
            row.lastAction = nxt;
            row.status = "wip";
          }
        } else {
          const nxt = nextActionFor(
            row.lastAction,
            row.doubleChecksRemaining ?? 0
          );
          if (nxt === "FINALIZE") {
            row.status = "done";
            row.lastAction = "FINALIZE";
          } else {
            row.lastAction = nxt;
            row.status = "wip";
          }
        }
      } else {
        // needs fixes → bounce back; optionally reset double-checks to be strict
        row.lastAction = "CREATE_OR_FIX_VUE";
        row.status = "wip";
        if (typeof row.doubleChecksRemaining === "number") {
          row.doubleChecksRemaining = Math.max(row.doubleChecksRemaining, 2);
        }
      }
    }
    saveState(s);
    const followUp =
      row.status === "done"
        ? `Slide ${slide} complete.`
        : reminder(row, row.lastAction!);
    return { content: [{ type: "text", text: followUp }] };
  });

  server.on("snap", async ({ input }) => {
    const { slide, width = 1920, height = 1080, wait = 3000 } = input as any;
    const s = loadState();
    const row = rowFor(s, slide);
    const out = path.join(ROOT, "screens", `slide${slide}-current.png`);
    const url = input.url ?? `http://localhost:3030/${slide}`;
    const cmd = `node ${path.join(ROOT, "tools", "snap.js")} --url "${url}" --out "${out}" --width ${width} --height ${height} --wait ${wait}`;
    const res = await run(cmd, ROOT);
    if (res.code !== 0)
      return {
        isError: true,
        content: [{ type: "text", text: res.err || res.out }],
      };
    row.screenshot = out;
    saveState(s);
    return {
      content: [
        { type: "text", text: out },
        {
          type: "render_image",
          image_url: `file://${out}`,
          alt_text: `Slide ${slide} screenshot`,
        },
      ],
    };
  });

  server.on("verify_snap", async ({ input }) => {
    const { slide } = input as any;
    const out = path.join(
      ROOT,
      "screens",
      `slide${slide}-final-verification.png`
    );
    const url = input.url ?? `http://localhost:3030/${slide}`;
    const cmd = `node ${path.join(ROOT, "tools", "snap-full.js")} --url "${url}" --out "${out}" --wait 3000`;
    const res = await run(cmd, ROOT);
    if (res.code !== 0)
      return {
        isError: true,
        content: [{ type: "text", text: res.err || res.out }],
      };
    return {
      content: [
        { type: "text", text: `Verification screenshot: ${out}` },
        {
          type: "render_image",
          image_url: `file://${out}`,
          alt_text: `Slide ${slide} verification`,
        },
      ],
    };
  });

  server.on("checklist", async ({ input }) => {
    const { slide } = input as any;
    return {
      content: [
        {
          type: "text",
          text: `Slide ${slide} verification:\n- ${checks().join("\n- ")}`,
        },
      ],
    };
  });
}
