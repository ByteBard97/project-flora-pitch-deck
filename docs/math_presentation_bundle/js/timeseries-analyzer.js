// Time Series Analyzer Interactive Demo
// Visualizes circular statistics and derivatives for angle sequences

// Global state for the time series analyzer
let timeSeriesState = {
    points: [],
    operationMode: 'average'
};

function initTimeSeriesAnalyzer() {
    console.log('Initializing Time Series Analyzer...');
    
    // Check if PIXI is loaded
    if (typeof PIXI === 'undefined') {
        console.log('PIXI not loaded yet, retrying...');
        setTimeout(initTimeSeriesAnalyzer, 200);
        return;
    }
    
    const container = document.getElementById('timeseries-analyzer-container');
    if (!container) {
        console.log('Time series analyzer container not found');
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
    
    // Reuse the atan2 filter from vector calculator
    const atan2Filter = new PIXI.Filter(undefined, `
        precision mediump float;
        uniform vec2 u_resolution;
        
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
            float hue = (angle + 3.14159265) / (2.0 * 3.14159265);
            float distance = length(centered_coord) / min(u_resolution.x, u_resolution.y) * 2.0;
            float lightness = 0.2 + 0.3 * (1.0 - min(distance, 1.0));
            vec3 color = hsl2rgb(hue, 0.6, lightness);
            gl_FragColor = vec4(color, 1.0);
        }
    `, {
        u_resolution: [app.screen.width, app.screen.height]
    });
    
    // Apply background filter
    app.stage.filterArea = app.screen;
    app.stage.filters = [atan2Filter];
    
    // Create graphics objects
    const graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);
    
    // Make stage interactive
    app.stage.interactive = true;
    
    // Circular mean calculation
    function calculateCircularMean(angles) {
        if (angles.length === 0) return 0;
        
        let x = 0, y = 0;
        for (const angle of angles) {
            x += Math.cos(angle);
            y += Math.sin(angle);
        }
        return Math.atan2(y, x);
    }
    
    // Calculate finite differences (derivatives)
    function calculateDerivatives(angles) {
        if (angles.length < 2) return [];
        
        const derivatives = [];
        for (let i = 1; i < angles.length; i++) {
            let diff = angles[i] - angles[i-1];
            
            // Handle angle wraparound
            if (diff > Math.PI) diff -= 2 * Math.PI;
            if (diff < -Math.PI) diff += 2 * Math.PI;
            
            derivatives.push(diff);
        }
        return derivatives;
    }
    
    // Drawing function
    function draw() {
        graphics.clear();
        
        const centerX = app.screen.width / 2;
        const centerY = app.screen.height / 2;
        const radius = Math.min(centerX, centerY) * 0.7;
        
        // Draw unit circle
        graphics.lineStyle(2, 0xFFFFFF, 0.3);
        graphics.drawCircle(centerX, centerY, radius);
        
        // Draw all clicked points
        timeSeriesState.points.forEach((point, index) => {
            const x = centerX + Math.cos(point.angle) * radius;
            const y = centerY + Math.sin(point.angle) * radius;
            
            // Draw point
            graphics.beginFill(0xFFFFFF, 0.8);
            graphics.drawCircle(x, y, 6);
            graphics.endFill();
            
            // Draw line from center
            graphics.lineStyle(2, 0xFFFFFF, 0.4);
            graphics.moveTo(centerX, centerY);
            graphics.lineTo(x, y);
            
            // Draw index number
            const text = new PIXI.Text(index.toString(), {
                fontSize: 12,
                fill: 0xFFFFFF
            });
            text.anchor.set(0.5);
            text.x = x + 15;
            text.y = y - 15;
            app.stage.addChild(text);
        });
        
        if (timeSeriesState.points.length === 0) return;
        
        const angles = timeSeriesState.points.map(p => p.angle);
        
        if (timeSeriesState.operationMode === 'average') {
            // Draw circular mean
            const meanAngle = calculateCircularMean(angles);
            const meanX = centerX + Math.cos(meanAngle) * radius;
            const meanY = centerY + Math.sin(meanAngle) * radius;
            
            graphics.lineStyle(8, 0xFFE66D);
            graphics.moveTo(centerX, centerY);
            graphics.lineTo(meanX, meanY);
            
            // Draw mean point
            graphics.beginFill(0xFFE66D);
            graphics.drawCircle(meanX, meanY, 12);
            graphics.endFill();
            
        } else if (timeSeriesState.operationMode === 'derivatives') {
            // Draw derivatives (finite differences)
            const derivatives = calculateDerivatives(angles);
            
            derivatives.forEach((derivative, index) => {
                const derivX = centerX + Math.cos(derivative) * radius * 0.6;
                const derivY = centerY + Math.sin(derivative) * radius * 0.6;
                
                // Use different colors for different derivatives
                const colors = [0xFF6B6B, 0x4ECDC4, 0x45B7D1, 0x96CEB4, 0xFECA57, 0xFF9FF3];
                const color = colors[index % colors.length];
                
                graphics.lineStyle(6, color);
                graphics.moveTo(centerX, centerY);
                graphics.lineTo(derivX, derivY);
                
                // Draw derivative point
                graphics.beginFill(color);
                graphics.drawCircle(derivX, derivY, 8);
                graphics.endFill();
            });
        }
    }
    
    // Event handlers
    app.stage.on('pointerdown', (event) => {
        const pos = event.data.global;
        const centerX = app.screen.width / 2;
        const centerY = app.screen.height / 2;
        
        const angle = Math.atan2(pos.y - centerY, pos.x - centerX);
        
        // Add new point
        timeSeriesState.points.push({ angle: angle });
        draw();
    });
    
    // Hook up dropdown
    const dropdown = document.getElementById('timeseries-operation');
    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            timeSeriesState.operationMode = e.target.value;
            draw();
        });
    }
    
    // Hook up clear button
    const clearButton = document.getElementById('clear-points');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            timeSeriesState.points = [];
            // Remove all text objects
            app.stage.children = app.stage.children.filter(child => !(child instanceof PIXI.Text));
            draw();
        });
    }
    
    // Initial draw
    draw();
    
    console.log('Time Series Analyzer initialized');
}