# Multi-Cloud DevOps Job Aggregator (AWS + Azure)

This project is a production-style, multi-cloud architecture that aggregates DevOps job listings from multiple sources and exposes them via a public API and frontend.

- **Azure**: Serverless scraping and queuing (Azure Functions + Storage Queue)
- **AWS**: Processing, API layer, and frontend hosting (Lambda, API Gateway, S3)
- **Database**: Centralised job storage in Azure PostgreSQL
- **IaC**: Terraform for both AWS and Azure
- **CI/CD**: GitHub Actions (planned)

## Status

- [x] Project structure defined
- [x] Terraform providers for AWS and Azure configured
- [ ] Azure Function scraper
- [ ] AWS Lambda processor
- [ ] API Gateway + Lambda
- [ ] Frontend (S3)
- [ ] Terraform modules
- [ ] CI/CD pipelines

