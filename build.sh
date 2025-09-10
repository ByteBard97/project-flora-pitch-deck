#!/bin/bash

# Build script for Math Presentation: Stop Fighting Wraparound
# This creates both single-file and bundle versions optimized for different use cases

set -e  # Exit on any error

echo "🎯 Building Math Presentation..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is required but not installed"
    exit 1
fi

# Check if required Python packages are available
python3 -c "import yaml" 2>/dev/null || {
    echo "❌ Error: Required Python packages not found"
    echo "Please install: pip install PyYAML"
    exit 1
}

# Run the simple builder (our new math-specific builder)
python3 simple_builder.py "$@"

# Check if build was successful
if [ -f "docs/index.html" ] && [ -d "docs/math_presentation_bundle" ]; then
    echo ""
    echo "✅ Build completed successfully!"
    echo "📄 Single file: docs/index.html" 
    echo "📁 Bundle folder: docs/math_presentation_bundle/"
    
    # Show file sizes
    single_size=$(du -h docs/index.html | cut -f1)
    bundle_size=$(du -sh docs/math_presentation_bundle | cut -f1)
    echo "📊 Single file: $single_size, Bundle: $bundle_size"
    echo ""
    echo "🚀 Ready to share with colleagues!"
    echo "   → Single file is perfect for email attachments"
    echo "   → Bundle folder can be zipped and shared"
else
    echo "❌ Build failed - output files not found"
    exit 1
fi