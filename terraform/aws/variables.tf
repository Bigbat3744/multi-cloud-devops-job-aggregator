variable "aws_region" {
  description = "AWS region for Lambda and EventBridge"
  type        = string
  default     = "eu-west-1"
}

variable "lambda_function_name" {
  description = "Name of the Lambda scraper function"
  type        = string
  default     = "devops-job-scraper"
}

variable "lambda_schedule_expression" {
  description = "How often the scraper runs (EventBridge cron or rate)"
  type        = string
  default     = "rate(15 minutes)"
}

