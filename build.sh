#!/bin/bash
# Flora Pitch Deck Builder
# Simple wrapper for the Python presentation builder

set -e

echo "🌿 Building Flora Pitch Deck..."
echo ""

# Clean previous build
if [ -f "docs/bundled.html" ]; then
    rm -f docs/bundled.html
    echo "🧹 Cleaned previous build"
fi

# Run the builder
python3 -c "from presentation_builder import PresentationBuilder; builder = PresentationBuilder(); builder.build_all()"

echo ""
echo "✅ Build complete!"
echo "📄 Output: docs/bundled.html"
echo ""
echo "🌐 Open http://localhost:8000/docs/bundled.html in your browser"
