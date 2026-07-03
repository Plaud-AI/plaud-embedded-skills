---
name: plaud-embedded-transcription-api-skill
description: Skill for users to implement Plaud Embedded's Transcription API. Use this skill when the user wants to transcribe audio files from their Plaud device or mobile app.
---

# Plaud Embedded Transcription API Skill
This skill provides context and instructions on how to upload audio files to Plaud for transcription.

## When To Use This Skill
Use this skill when a user wants to transcribe audio files using Plaud's Transcription Pipeline (the pipeline performs language detection, 
noise reduction, ASR, Speech-to-text, etc.)

### Prerequisites
- [ ] User has audio files on either: 
    1. Their mobile app synced from a Plaud Device
    2. An audio file available for download on a public URL (i.e. S3 download URL)

## How Plaud's Transcription API works

The **Transcription API** is an AI API with two main endpoints.

1. Triggers an async transcription job given a `file_url` to download an audio file
2. Get transcription task status for polling; On task finish, the conversation transcription will be available

## How to Start Transcribing

The Transcription API itself requires a public download URL to download the audio file. 

**If the developer does not have a way to upload files and generate public download URLs already, use the File Upload API**.

Else, skip the File Upload API and use the Transcription API directly.

### File Upload API \[ONLY FOR USERS WHO DO NOT HAVE A DOWNLOAD URL TO ACCESS THEIR AUDIO FILE\]

The File Upload API is an API to use Plaud's cloud storage to upload audio files. 
This can be performed either from your mobile app or from your backend.

Read the [File Upload Overview](https://docs.plaud.ai/plaud-embedded/file-api-overview.md) for the available File Upload API endpoints and data flow.

**IMPORTANT**: Confirm the Region URL with the user

#### API Reference (The Upload Step is not included as it's directly to S3)
* [Generating presigned upload URLs](https://docs.plaud.ai/api-reference/file-upload-api/generate-presigned-upload-urls.md) 
* [Completing the upload](https://docs.plaud.ai/api-reference/file-upload-api/complete-multipart-upload.md) 

### Transcription API
After an audio file has been uploaded to a public download API (either via the File Upload API or through a user's unique cloud storage), the user can use the Transcription API on the file URL.

The [Transcription API Overview](https://docs.plaud.ai/plaud-embedded/transcription-api-overview.md) goes through how Plaud's transcription flow works.

#### API Reference
* [Submit audio URL for transcription](https://docs.plaud.ai/api-reference/transcription-api/submit-audio-for-transcription.md)
* [Get transcription task status/results](https://docs.plaud.ai/api-reference/transcription-api/get-transcription-task.md)

## Reference Code
* [Snippet from Plaud Starter App](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/plaud-template-app/ios/PlaudTemplateApp/Managers/TranscriptionManager.swift)

## Definition of Done - Completed Implmentation of the Transcription API
When the user can: 
- [ ] (If the user does not have a public download URL already) Upload audio files from their mobile app to Plaud's managed storage via the File Upload API
- [ ] Submit and get transcriptions for the Transcription API
