# The map of moderm mathematics


Ever wondered what Geometric Algebra is? What Hoe Lie groups theory is related to differential equations?
Modern mathematics is a rhizome of related theories (realetad to each other in differnt ways), so this project provides interactive visualization of this map.

Proposed setup serves an interactive Mathematics Rhizome visualization via http://localhost/math-map


## Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

## Access the Application

Once running, open your browser and navigate to:

**http://localhost/math-map**

## Troubleshooting

If port 80 is already in use, you can change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "81:80"  # Change 80 to 81 or any other available port
```

Then access via: http://localhost:80/math-map

## Stopping the Application

```bash
docker-compose down
```

## Files

- `math-rhizome.jsx` - Your React component
- `index.html` - HTML wrapper that loads React and your component
- `nginx.conf` - Nginx configuration for serving at /math-map path
- `Dockerfile` - Docker image definition
- `docker-compose.yml` - Docker Compose configuration
