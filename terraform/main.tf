terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.26.0"
    }
  }

  backend "s3" {
    key            = "global/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "tf-state-lock"

  }

  required_version = ">= 1.3.0"
}

resource "aws_dynamodb_table" "state-lock" {
  name         = "tf-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

