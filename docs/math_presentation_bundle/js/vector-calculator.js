// Vector Calculator Interactive Demo
// Visualizes vector addition and subtraction using angle representation

// GLSL Fragment Shader for atan2 background visualization
const atan2FragmentShader = `
precision mediump float;
uniform vec2 u_resolution;

// Convert HSL to RGB
vec3 hsl2rgb(float h, float s, float l) {
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
    float m = l - c / 2.0;
    
    vec3 rgb;
    if (h < 1.0/6.0) {
        rgb = vec3(c, x, 0.0);
    } else if (h < 2.0/6.0) {
        rgb = vec3(x, c, 0.0);
    } else if (h < 3.0/6.0) {
        rgb = vec3(0.0, c, x);
    } else if (h < 4.0/6.0) {
        rgb = vec3(0.0, x, c);
    } else if (h < 5.0/6.0) {
        rgb = vec3(x, 0.0, c);
    } else {
        rgb = vec3(c, 0.0, x);
    }
    
    return rgb + m;
}

void main() {
    vec2 centered_coord = gl_FragCoord.xy - u_resolution / 2.0;
    float angle = atan(centered_coord.y, centered_coord.x);
    
    // Map angle from [-PI, PI] to [0, 1] for hue
    float hue = (angle + 3.14159265) / (2.0 * 3.14159265);
    
    // Create radial gradient for better visualization
    float distance = length(centered_coord) / min(u_resolution.x, u_resolution.y) * 2.0;
    float lightness = 0.3 + 0.4 * (1.0 - min(distance, 1.0));
    
    vec3 color = hsl2rgb(hue, 0.8, lightness);
    gl_FragColor = vec4(color, 1.0);
}
`;

// Global state for the vector calculator
let vectorCalculatorState = {
    p1_angle: 0.0,
    p2_angle: Math.PI / 4,
    operationMode: 'addition'
};

function initVectorCalculator() {
    console.log('Initializing Vector Calculator...');
    console.log('Current state:', vectorCalculatorState);
    
    // Check if PIXI is loaded
    if (typeof PIXI === 'undefined') {
        console.log('PIXI not loaded yet, retrying...');
        setTimeout(initVectorCalculator, 200);
        return;
    }
    
    const container = document.getElementById('vector-calculator-container');
    if (!container) {
        console.log('Vector calculator container not found');
        return;
    }
    
    // Clean up any existing app
    if (window.currentInteractiveApp) {
        window.currentInteractiveApp.destroy(true, { children: true, texture: true, baseTexture: true });
        window.currentInteractiveApp = null;
    }
    
    // Create PIXI application
    const app = new PIXI.Application({
        width: container.offsetWidth,
        height: container.offsetHeight,
        backgroundColor: 0x000000,
        antialias: true
    });
    
    container.appendChild(app.view);
    window.currentInteractiveApp = app;
    
    // Create custom filter for atan2 background
    const atan2Filter = new PIXI.Filter(undefined, atan2FragmentShader, {
        u_resolution: [app.screen.width, app.screen.height]
    });
    
    // Apply background filter
    app.stage.filterArea = app.screen;
    app.stage.filters = [atan2Filter];
    
    // Create graphics objects
    const graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);
    
    // Interactive state
    let isDragging = false;
    let dragTarget = null;
    
    // Make stage interactive
    app.stage.interactive = true;
    
    // Drawing function
    function draw() {
        graphics.clear();
        
        const centerX = app.screen.width / 2;
        const centerY = app.screen.height / 2;
        const radius = Math.min(centerX, centerY) * 0.7;
        
        // Draw unit circle
        graphics.lineStyle(3, 0xFFFFFF, 0.8);
        graphics.drawCircle(centerX, centerY, radius);
        
        // Calculate positions
        const p1x = centerX + Math.cos(vectorCalculatorState.p1_angle) * radius;
        const p1y = centerY + Math.sin(vectorCalculatorState.p1_angle) * radius;
        const p2x = centerX + Math.cos(vectorCalculatorState.p2_angle) * radius;
        const p2y = centerY + Math.sin(vectorCalculatorState.p2_angle) * radius;
        
        // Draw vectors with thicker lines
        graphics.lineStyle(6, 0xFF6B6B, 1.0);
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(p1x, p1y);
        
        graphics.lineStyle(6, 0x4ECDC4, 1.0);
        graphics.moveTo(centerX, centerY);
        graphics.lineTo(p2x, p2y);
        
        // Draw result based on operation mode
        if (vectorCalculatorState.operationMode === 'addition') {
            const resultAngle = vectorCalculatorState.p1_angle + vectorCalculatorState.p2_angle;
            const resultX = centerX + Math.cos(resultAngle) * radius;
            const resultY = centerY + Math.sin(resultAngle) * radius;
            
            graphics.lineStyle(6, 0xFFE66D);
            graphics.moveTo(centerX, centerY);
            graphics.lineTo(resultX, resultY);
        } else {
            // Subtraction - show angle between vectors
            const angleDiff = vectorCalculatorState.p1_angle - vectorCalculatorState.p2_angle;
            const resultX = centerX + Math.cos(angleDiff) * radius;
            const resultY = centerY + Math.sin(angleDiff) * radius;
            
            graphics.lineStyle(6, 0xFF8B94);
            graphics.moveTo(centerX, centerY);
            graphics.lineTo(resultX, resultY);
        }
        
        // Draw draggable handles with white outlines for visibility
        graphics.lineStyle(3, 0xFFFFFF, 1.0);
        graphics.beginFill(0xFF6B6B, 1.0);
        graphics.drawCircle(p1x, p1y, 15);
        graphics.endFill();
        
        graphics.lineStyle(3, 0xFFFFFF, 1.0);
        graphics.beginFill(0x4ECDC4, 1.0);
        graphics.drawCircle(p2x, p2y, 15);
        graphics.endFill();
        
        // Add text labels near handles
        graphics.lineStyle(0);
        graphics.beginFill(0xFFFFFF, 0.9);
        graphics.drawCircle(p1x + 20, p1y - 20, 8);
        graphics.drawCircle(p2x + 20, p2y - 20, 8);
        graphics.endFill();
    }
    
    // Event handlers
    app.stage.on('pointerdown', (event) => {
        const pos = event.data.global;
        const centerX = app.screen.width / 2;
        const centerY = app.screen.height / 2;
        const radius = Math.min(centerX, centerY) * 0.7;
        
        const p1x = centerX + Math.cos(vectorCalculatorState.p1_angle) * radius;
        const p1y = centerY + Math.sin(vectorCalculatorState.p1_angle) * radius;
        const p2x = centerX + Math.cos(vectorCalculatorState.p2_angle) * radius;
        const p2y = centerY + Math.sin(vectorCalculatorState.p2_angle) * radius;
        
        // Check if clicking on handles (larger hit area for easier interaction)
        const dist1 = Math.sqrt((pos.x - p1x) ** 2 + (pos.y - p1y) ** 2);
        const dist2 = Math.sqrt((pos.x - p2x) ** 2 + (pos.y - p2y) ** 2);
        
        if (dist1 < 30) {
            isDragging = true;
            dragTarget = 'p1';
            console.log('Dragging red handle');
        } else if (dist2 < 30) {
            isDragging = true;
            dragTarget = 'p2';
            console.log('Dragging blue handle');
        }
    });
    
    app.stage.on('pointermove', (event) => {
        if (!isDragging) return;
        
        const pos = event.data.global;
        const centerX = app.screen.width / 2;
        const centerY = app.screen.height / 2;
        
        const angle = Math.atan2(pos.y - centerY, pos.x - centerX);
        
        if (dragTarget === 'p1') {
            vectorCalculatorState.p1_angle = angle;
        } else if (dragTarget === 'p2') {
            vectorCalculatorState.p2_angle = angle;
        }
        
        draw();
    });
    
    app.stage.on('pointerup', () => {
        isDragging = false;
        dragTarget = null;
    });
    
    // Hook up dropdown
    const dropdown = document.getElementById('vector-operation');
    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            vectorCalculatorState.operationMode = e.target.value;
            draw();
        });
    }
    
    // Initial draw
    draw();
    
    console.log('Vector Calculator initialized');
}