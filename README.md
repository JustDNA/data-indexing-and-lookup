## Requirements of the system:
- Connect to online data sources (file based), pull data
- Fetch the contents of data in text format (data can be in any format). Eg: if there is a png image, the system should be able to extract text from the image
- Index the text contents and file metadata to a search engine like elasticsearch
- Expose an API `/search?query='...'` where the contents of files can be queried to find out the source files info that had matches.

## DEMO
This is a demo video where I explain the
- architecture (starts at 0:00)
- local implementation (code structure) (starts at 13:35)
- end-to-end demo (starts at 24:20)

DEMO VIDEO: https://drive.google.com/file/d/119r1gESuFnIx7Gk1geGHnwYsv5Pczw9S/view?usp=sharing

## High level design:
![resources](https://docs.google.com/drawings/d/1z3Z2WJyDEvgjXPVIk9dTVhl9kgAt8pvgfN2tLYcup9E/export/png)

## POC implementation (in Mac):
### Prerequisites (host machine need to have the following)
- redis (used as the config store)
- elasticsearch (used as search engine)
- tesseract (used for text extraction from image)
- xpdf (used for text extraction from pdf)

### Adaptations made for local implementation:
- Using redis instead of a an object store (for storing configs) like dynamodb or mongodb: easy to get started but interfaces are modularly defined to switch out to use any other object store
- Using bull npm library for queuing system (in AWS, SQS will be used). Again interfaces are modularly defined to switch out to use any other messaging system
- We use node scripts listening to queues (implemented with bull npm module) to represent an event driven environment

### List of file types that can be indexed by the system:
For extracting text from any kind of file, textract module is used and it supports a wide variety of file types right out of the box. For few file types, the host machine may need to have certain softwares installed (like tesseract for image to text and xpdf for pdf to text). https://www.npmjs.com/package/textract/v/2.4.0#currently-extracts

## Improvements in system:
- Capture deletes and renames of files at source
- Track runtime states of different stages of the pipeline
- Backfill of files (indexing files from before)
- Have separate dead letter queues at every stage to capture events that failed after exhausting retries
- Whitelist/blacklist list of files to be pulled from source
- Enforce json schema for configs
- Event payloads flowing through the messaging systems need to have a standard schema enforced by json schema
- Handle very large objects? (to be tested)
- Handle files without file extensions
