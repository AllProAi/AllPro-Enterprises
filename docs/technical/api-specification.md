# API Specification

## Authentication

### Endpoints

```
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

### Service Endpoints

#### Properties
```
GET    /api/v1/properties
POST   /api/v1/properties
GET    /api/v1/properties/:id
PUT    /api/v1/properties/:id
DELETE /api/v1/properties/:id
```

#### Services
```
GET    /api/v1/services
POST   /api/v1/services
GET    /api/v1/services/:id
PUT    /api/v1/services/:id
DELETE /api/v1/services/:id
```

#### Reports
```
GET    /api/v1/reports
POST   /api/v1/reports
GET    /api/v1/reports/:id
PUT    /api/v1/reports/:id
```

## Data Models

### Property
```json
{
  "id": "uuid",
  "name": "string",
  "address": "string",
  "contactPerson": "string",
  "contactPhone": "string",
  "poolSpecs": {
    "size": "number",
    "type": "string",
    "equipment": ["string"]
  }
}
```

### Service
```json
{
  "id": "uuid",
  "propertyId": "uuid",
  "type": "string",
  "schedule": {
    "frequency": "string",
    "preferredTime": "string"
  },
  "status": "string"
}
```