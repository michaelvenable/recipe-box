// Create a bucket.
resource "aws_s3_bucket" "this" {
    bucket = var.bucket
    acl = "public-read"

    website {
        index_document = "index.html"
    }

    policy = <<EOF
{
  "Version":"2012-10-17",
  "Statement":[{
	"Sid":"PublicReadGetObject",
        "Effect":"Allow",
	  "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${var.bucket}/*"
      ]
    }
  ]
}
EOF
}