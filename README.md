# The map of moderm mathematics


Ever wondered what Geometric Algebra is? What Lie groups theory has to do with differential equations?
Modern mathematics is a rhizome of related theories (realetad to each other in different ways), so this project provides interactive visualization of this map.

Proposed setup serves an interactive Math landscape [visualization]( https://sajonaro.github.io/math-map/ )


#### You can also run the code locally using Docker Compose (Recommended)

```bash
# Build and start the application
docker-compose up -d
```

Then once running, access the application via: http://localhost:80/math-map

#### Troubleshooting

If port 80 is already in use, you can change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "81:80"  # Change 80 to 81 or any other available port
```

#### Stopping the Application

```bash
docker-compose down
```