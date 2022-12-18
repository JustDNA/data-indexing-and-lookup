## Requirements of the system:
- Connect to online data sources (file based), pull data
- Fetch the contents of data in text format (data can be in any format). Eg: if there is a png image, the system should be able to extract text from the image
- Index the text contents and file metadata to a search engine like elasticsearch
- Expose an API `/search?query='...'` where the contents of files can be queried to find out the source files info that had matches.

## High level design:
![resources](https://docs.google.com/drawings/d/1z3Z2WJyDEvgjXPVIk9dTVhl9kgAt8pvgfN2tLYcup9E/export/png)

## POC implementation (in Mac):
### Prerequisites (host machine need to have the following)
- redis (used as the config store)
- elasticsearch (used as search engine)
- tesseract (used for text extraction from any kind of file)

### Adaptations made for local implementation:
- Using redis instead of a proper object store: easy to get started but interfaces are modularly defined to switch out to use any other object store
- Using bull npm library for queuing system (in AWS SQS will be used). Again interfaces are modularly defined to switch out to use any other messaging system
- We use node scripts listening to queues (bull) to represent event driven environment

### List of file types that can be indexed by the system:
https://www.npmjs.com/package/textract/v/2.4.0#currently-extracts

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