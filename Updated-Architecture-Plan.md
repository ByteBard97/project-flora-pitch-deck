# Flora Backend - Updated Architecture Plan

## 🎯 **Revised Division of Responsibilities**

After analysis, we've refined the architecture to minimize server dependencies and leverage client-side capabilities more effectively.

## 🖥️ **Server-Side Responsibilities (Django REST API)**

### **Core Data Management**
- **Plant database CRUD** - Centralized, updateable without plugin releases
- **Plant search, filtering, categorization** - Leverage database queries
- **Data validation and quality checks** - Batch operations on plant data
- **Plant metadata sync** - Push updates to distributed plugins

### **Team Collaboration (Future)**
- **User authentication** - When team features are needed
- **Shared plant libraries** - Cross-team plant palettes
- **Project sharing** - Multi-user site collaboration

### **Integration & Export**
- **External tool integration** - APIs for GIS tools, other CAD software
- **Manifest export/import** - JSON interchange with external viewers
- **Backup and archival** - Long-term project storage

### **Data-Heavy Operations**
- **Batch plant imports** - Large dataset processing
- **Statistical analysis** - Database-wide plant usage, trends
- **Administrative tools** - Bulk updates, data migrations

---

## 📱 **Client-Side Responsibilities (UXP Plugin + JavaScript)**

### **All Computational Geometry**
- **Place along path** - Linear interpolation, spacing calculations
- **Area fill algorithms** - Grid, hex, jitter patterns using JavaScript
- **Spacing validation** - Distance calculations, overlap detection
- **Collision detection** - Real-time as user drags/places plants

### **Interactive UI & Workflow**
- **Plant placement tools** - Direct manipulation in Illustrator
- **Live preview** - 60fps feedback during placement
- **Undo/redo** - Leverage Illustrator's native system
- **Visual feedback** - Highlighting, ghost previews, selection

### **Document Management**
- **Current layout state** - Store in Illustrator document metadata
- **Plant instance tracking** - Which plants are placed where
- **Local project settings** - Scale, units, coordinate system per document
- **Recently used plants** - Local cache for speed

### **Performance-Critical Operations**
- **BOM generation** - Count plants directly from document
- **Schedule creation** - Calculate locally, format as needed
- **Growth preview** - Draw maturity circles using cached plant data
- **Labeling** - Place text directly in Illustrator

---

## 🔄 **Data Flow Architecture**

### **Plugin Startup**
```javascript
// 1. Check local plant cache
const cachedPlants = getLocalPlantCache()

// 2. Sync with server if cache expired
if (isCacheExpired() || userRequestsSync()) {
  const latestPlants = await fetch('/api/plants/')
  updateLocalCache(latestPlants)
}

// 3. Ready to work offline
renderPlantPicker(getCachedPlants())
```

### **Plant Placement Workflow**
```javascript
// All geometry calculations local
function placeAlongPath(path, spacing, plantId) {
  const points = calculatePathPositions(path, spacing) // JavaScript
  points.forEach(point => {
    placePlantSymbol(point, plantId) // Illustrator API
    storeMetadata(point, plantId)    // Document metadata
  })
}
```

### **Project Sharing (Optional)**
```javascript
// Export for team sharing
function exportProject() {
  const manifest = {
    plants: extractPlantInstances(),  // From document
    settings: getProjectSettings(),   // From document metadata
    version: '1.0'
  }

  // Optional: save to server for sharing
  await fetch('/api/projects/export', {
    method: 'POST',
    body: JSON.stringify(manifest)
  })
}
```

---

## 📊 **Current Backend Status vs. Plan**

### ✅ **What We Have (Correct)**
- Comprehensive plant database with Florida-specific fields
- Visual design properties (colors, radii, SVG symbols)
- Plant variants and layout profiles
- REST API with filtering, search, pagination
- Data validation and management commands
- Admin interface for data verification

### ❌ **What We Don't Need (Remove)**
- ~~Server-side layout algorithms~~ → JavaScript
- ~~Real-time positioning APIs~~ → Client-side
- ~~Complex geometry operations~~ → UXP Plugin

### 🔄 **What We Should Add (Minimal)**
- **Plant sync endpoint** - Optimized for plugin cache updates
- **Manifest export/import** - For external tool integration
- **Plugin authentication** - Simple token-based (future)

---

## 🛠️ **Recommended Backend Additions**

### **1. Optimized Plant Sync API**
```python
@api_view(['GET'])
def plants_sync(request):
    """Optimized endpoint for plugin synchronization"""
    last_sync = request.GET.get('since')  # Timestamp

    if last_sync:
        plants = Plant.objects.filter(updated_at__gt=last_sync)
    else:
        plants = Plant.objects.all()

    return Response({
        'plants': PlantSyncSerializer(plants, many=True).data,
        'timestamp': timezone.now(),
        'total_count': Plant.objects.count()
    })
```

### **2. Lightweight Manifest Support**
```python
@api_view(['POST'])
def export_manifest(request):
    """Export layout manifest for external tools"""
    manifest_data = request.data

    # Validate and store manifest
    manifest_id = save_manifest(manifest_data)

    return Response({
        'manifest_id': manifest_id,
        'download_url': f'/api/manifests/{manifest_id}/download/',
        'expires_at': timezone.now() + timedelta(days=30)
    })
```

### **3. Plugin Version Management**
```python
@api_view(['GET'])
def plugin_info(request):
    """Plugin version and compatibility info"""
    return Response({
        'current_version': '1.0.0',
        'min_supported': '1.0.0',
        'update_required': False,
        'features': ['plant_sync', 'manifest_export']
    })
```

---

## 🎯 **Updated Implementation Priorities**

### **Phase 1: Core Backend (Complete)**
- ✅ Plant database with visual properties
- ✅ REST API for plant management
- ✅ Data validation tools
- ✅ Vue frontend for data verification

### **Phase 2: Plugin Integration (Next)**
- 🔄 Optimized sync endpoints
- 🔄 Manifest export/import
- 🔄 Plugin authentication (optional)

### **Phase 3: JavaScript Plant Tools (UXP Plugin)**
- 📱 Place along path (JavaScript geometry)
- 📱 Area fill algorithms (grid/hex/jitter)
- 📱 Spacing validation (distance calculations)
- 📱 BOM generation (count from document)

### **Phase 4: Advanced Features (Future)**
- 🌐 Team collaboration
- 🌐 External tool integrations
- 🌐 Advanced manifest workflows

---

## 💡 **Key Benefits of This Architecture**

1. **Faster Performance** - No server round trips for geometry
2. **Offline Capable** - Plugin works without internet after sync
3. **Simpler Deployment** - Less server complexity
4. **Better UX** - Real-time feedback for plant placement
5. **Scalable** - Server focuses on data, client handles computation

---

## 🔧 **Next Steps**

1. **Complete current backend** - Finish Vue plant verification interface
2. **Add sync endpoints** - Optimize for plugin consumption
3. **Start UXP plugin** - Focus on plant placement tools
4. **Move geometry to JavaScript** - Implement client-side algorithms

This architecture leverages the strengths of both server (data management) and client (interactive geometry) while keeping the system simple and performant.