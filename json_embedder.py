#!/usr/bin/env python3
"""
Presentation Build System
Compiles modular slides into single file or bundle with WebP image optimization

Usage:
    ./build.py                    # Direct execution
    conda run -n superglue-env ./build.py    # With specific conda env
"""

import json
from pathlib import Path
from templates import JSON_EMBED


class JSONDataEmbedder:
    """Handles JSON data embedding for Plotly visualizations"""
    
    @staticmethod
    def load_and_embed_json_data():
        """Load JSON data and properly escape it for JavaScript embedding"""
        plotly_data_str = None
        heatmap_data_str = None
        
        # Load Plotly JSON data
        plotly_path = Path('/home/geoff/projects/lwir-align/results/threshold_data_plotly.json')
        if plotly_path.exists():
            try:
                with open(plotly_path, 'r') as f:
                    plotly_data_str = f.read()
                print(f"   📊 Loaded Plotly data from {plotly_path.name}")
            except Exception as e:
                print(f"   ❌ Error loading Plotly data: {e}")
        
        # Load Heatmap JSON data
        heatmap_path = Path('/home/geoff/projects/lwir-align/results/threshold_data_heatmap.json')
        if heatmap_path.exists():
            try:
                with open(heatmap_path, 'r') as f:
                    heatmap_data_str = f.read()
                print(f"   📊 Loaded Heatmap data from {heatmap_path.name}")
            except Exception as e:
                print(f"   ❌ Error loading Heatmap data: {e}")
        
        # CRITICAL FIX: Properly escape JSON strings for JavaScript embedding
        # First, compact the JSON (remove unnecessary whitespace)
        if plotly_data_str:
            plotly_obj = json.loads(plotly_data_str)
            plotly_data_str = json.dumps(plotly_obj, separators=(',', ':'))
        if heatmap_data_str:
            heatmap_obj = json.loads(heatmap_data_str)
            heatmap_data_str = json.dumps(heatmap_obj, separators=(',', ':'))
        
        # json.dumps() escapes the string so it can be safely embedded in JavaScript
        plotly_js_string = json.dumps(plotly_data_str) if plotly_data_str else 'null'
        heatmap_js_string = json.dumps(heatmap_data_str) if heatmap_data_str else 'null'
        
        # Generate JavaScript using template
        return JSON_EMBED.replace('{{PLOTLY_DATA}}', plotly_js_string) \
                        .replace('{{HEATMAP_DATA}}', heatmap_js_string)




