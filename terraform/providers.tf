provider "aws" {
  region = "eu-west-1"
  default_tags {
    tags = {
      owner = "terraform"
    }
  }
}

provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"

  default_tags {
    tags = {
      owner = "terraform"
    }
  }
}
