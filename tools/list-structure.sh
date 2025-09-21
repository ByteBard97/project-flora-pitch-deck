#!/bin/bash

# Script to display project structure with ASCII tree symbols
# Shows files in layouts/, composables/, components/, and root folder

echo "Project Flora Pitch Deck - File Structure"
echo "=========================================="
echo ""

PROJECT_ROOT="/home/geoff/projects/project-flora-pitch-deck"

# Function to list files in a directory with tree symbols
list_directory() {
    local dir="$1"
    local prefix="$2"
    local is_last="$3"

    if [ ! -d "$dir" ]; then
        echo "${prefix}├── [Directory not found]"
        return
    fi

    # Get all files and directories, sorted
    local items=($(ls -1 "$dir" 2>/dev/null | sort))
    local count=${#items[@]}

    if [ $count -eq 0 ]; then
        echo "${prefix}├── [Empty directory]"
        return
    fi

    for ((i=0; i<$count; i++)); do
        local item="${items[$i]}"
        local item_path="$dir/$item"

        # Determine if this is the last item
        if [ $i -eq $((count-1)) ]; then
            local symbol="└──"
            local next_prefix="${prefix}    "
        else
            local symbol="├──"
            local next_prefix="${prefix}│   "
        fi

        if [ -d "$item_path" ]; then
            echo "${prefix}${symbol} 📁 $item/"
            list_directory "$item_path" "$next_prefix" false
        else
            # Add file type icons based on extension
            case "$item" in
                *.vue) echo "${prefix}${symbol} 🖼️  $item" ;;
                *.js) echo "${prefix}${symbol} 📜 $item" ;;
                *.ts) echo "${prefix}${symbol} 📘 $item" ;;
                *.md) echo "${prefix}${symbol} 📝 $item" ;;
                *.json) echo "${prefix}${symbol} ⚙️  $item" ;;
                *.css) echo "${prefix}${symbol} 🎨 $item" ;;
                *.html) echo "${prefix}${symbol} 🌐 $item" ;;
                *.png|*.jpg|*.jpeg|*.webp|*.gif) echo "${prefix}${symbol} 🖼️  $item" ;;
                *.sh) echo "${prefix}${symbol} ⚡ $item" ;;
                *) echo "${prefix}${symbol} 📄 $item" ;;
            esac
        fi
    done
}

# List root directory files (excluding the specific folders we'll show separately)
echo "📂 Root Directory"
echo "│"
cd "$PROJECT_ROOT"
for item in *; do
    if [ -f "$item" ]; then
        case "$item" in
            *.vue) echo "├── 🖼️  $item" ;;
            *.js) echo "├── 📜 $item" ;;
            *.ts) echo "├── 📘 $item" ;;
            *.md) echo "├── 📝 $item" ;;
            *.json) echo "├── ⚙️  $item" ;;
            *.css) echo "├── 🎨 $item" ;;
            *.html) echo "├── 🌐 $item" ;;
            *.png|*.jpg|*.jpeg|*.webp|*.gif) echo "├── 🖼️  $item" ;;
            *.sh) echo "├── ⚡ $item" ;;
            *) echo "├── 📄 $item" ;;
        esac
    fi
done

echo "│"

# List the specific directories
directories=("layouts" "composables" "components")

for dir in "${directories[@]}"; do
    echo "├── 📁 $dir/"
    list_directory "$PROJECT_ROOT/$dir" "│   " false
    echo "│"
done

echo "└── [End of structure]"
echo ""
echo "Legend:"
echo "📁 Directory   📜 JavaScript   📘 TypeScript   🖼️  Vue/Image"
echo "📝 Markdown    ⚙️  JSON        🎨 CSS         🌐 HTML"
echo "📄 Other file  ⚡ Shell script"