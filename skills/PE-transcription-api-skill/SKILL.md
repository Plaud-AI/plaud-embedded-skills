---
name: plaud-embedded-transcription-api-skill
description: Skill for users to implement Plaud Embedded's Transcription API. Use this skill when the user wants to transcribe audio files from their Plaud device or mobile app.
---

# Plaud Embedded Transcription API Skill
This skill provides context and instructions on how to upload audio files to Plaud for transcription.

## When To Use This Skill
Use this skill when a user is ready to start transcribing their audio files from their Plaud Embedded-enabled mobile app.

### Prerequisites
- [ ] User has connected their Plaud device with their mobile app
- [ ] User has synced audio files from their Plaud device to their mobile app

## How Plaud's Transcription API works
Plaud's Transcription API has two components:

1. The **File Upload** step to upload audio files to Plaud's Cloud Storage (S3)
2. The **Transcription** step to trigger an async transcription job and poll for task status; On task finish, the conversation transcription will be available

## How to Start Transcribing

### File Upload API

Read the [File Upload Overview](https://docs.plaud.ai/plaud-embedded/file-api-overview.md) for the available File Upload API endpoints and data flow.

**IMPORTANT**: Confirm the Region URL with the user

#### API Reference (The Upload Step is not included as it's directly to S3)
* [Generating presigned upload URLs](https://docs.plaud.ai/api-reference/file-upload-api/generate-presigned-upload-urls.md) 
* [Completing the upload](https://docs.plaud.ai/api-reference/file-upload-api/complete-multipart-upload.md) 

### Transcription API
After an audio file has been uploaded with the File Upload API, the user can use the Transcription API on the uploaded file URL.

The [Transcription API Overview](https://docs.plaud.ai/plaud-embedded/transcription-api-overview.md) goes through how Plaud's transcription flow works.

#### API Reference
* [Submit audio URL for transcription](https://docs.plaud.ai/api-reference/transcription-api/submit-audio-for-transcription.md)
* [Get transcription task status/results](https://docs.plaud.ai/api-reference/transcription-api/get-transcription-task)

## Reference Code
* [Snippet from Plaud Starter App](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/plaud-template-app/ios/PlaudTemplateApp/Managers/TranscriptionManager.swift)

## Definition of Done - Completed Implmentation of the Transcription API
When the user can: 
- [ ] Upload audio files from their mobile app to Plaud's managed storage via the File Upload API
- [ ] Submit and get transcriptions for the Transcription API
