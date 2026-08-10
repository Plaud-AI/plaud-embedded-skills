---
name: plaud-embedded-android-sdk-skill
description: Skill for users to implement Plaud Embedded's Android SDK. Use this skill when a user mentions the Android Plaud Starter App or wants to integrate the Plaud Embedded SDK with their existing android app
---

# Plaud Embedded Android SDK Skill
This skill provides context and instructions on how to implement the Plaud Embedded Android SDK.

## When To Use This Skill
Use this skill when a user wants to connect their native Android app with Plaud recording devices (Plaud NotePin S and Plaud Note Pro).

Before getting started with this skill, make sure the user has the following prerequisites

### Prerequisites
- [ ] Already has their Plaud Embedded credentials (`CLIENT_ID`, `CLIENT_SECRET`, and `API_KEY`) from their Plaud Developer Portal
- [ ] Has a way to retrieve their User Token via Plaud's Authentication API

If a user does not have both of these prerequisites, use the `plaud-embedded-project-setup-skill` for instructions

## Getting Started

Follow the instructions in the [Installation Guide](https://docs.plaud.ai/plaud-embedded/android-sdk.md)

### How to Deploy the Plaud Starter App
The Plaud Starter App is a fully built out Android app with the Embedded SDK already implemented.

The Starter App comes with [many built-out features](https://docs.plaud.ai/plaud-embedded/starter-app-specs.md) the user can immediately use.

Direct the user to clone the Starter App repo and go through the steps in the [Starter App Guide](https://docs.plaud.ai/plaud-embedded/android-starter-app.md). The Android starter app lives at `android/` inside [plaud-sdk-public](https://github.com/Plaud-AI/plaud-sdk-public).

Credentials go in a gitignored `local.properties` in the `android/` directory: `PLAUD_USER_ACCESS_TOKEN` (required for SDK init) plus `PLAUD_CLIENT_ID` and `PLAUD_API_KEY` (only needed for the Transcription API).

### How to Implement the Embedded SDK for Android
The Embedded SDK is an Android library for :

1. Connecting (binding) and unbinding Plaud devices to the user's Android mobile app
2. Syncing audio from Plaud devices to the user's mobile app — via BLE or WiFi Fast Transfer (~10x faster), including batch download of all recordings
3. Exporting audio in multiple formats (`AudioExportFormat.PCM` | `WAV` | `OPUS` | `MP3`). **Recommend `MP3`** — it plays everywhere and is accepted directly by the transcription upload API
4. Firmware over-the-air (OTA) updates for connected Plaud devices

The two high-level facades are **`PlaudDeviceAgent`** (a Kotlin `object` you call statically — there is no instance to construct) and **`IWifiTransferAgent`** (reached with `PlaudDeviceAgent.getWifiAgent()`, which returns a nullable, so always use a safe call). Initialize once with `initSDK(context:userAccessToken:customDomain:)`, where `customDomain` is the Plaud domain **without** the `https://` prefix (e.g. `platform-us.plaud.ai`).

The SDK is a callback-driven library - you implement callbacks (`PlaudDeviceAgentListener`, `AudioExporter.ExportCallback`, `IWifiTransferAgent.WifiTransferCallback`, `FirmwareUpdateCallback`) to receive device events, transfer progress, and results.

* `PlaudDeviceAgentListener` has **0 required members** — assign one global listener to `PlaudDeviceAgent.listener` and override only what's needed
* `IWifiTransferAgent.WifiTransferCallback` has **12 required members** — there are no default implementations

BLE scanning requires runtime permissions. Use the SDK's `sdk.permission.PermissionManager`, which requests the full set it needs (`BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`, `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION` on API 31+; `BLUETOOTH`, `BLUETOOTH_ADMIN`, and both location permissions on API ≤ 30).

**IMPORTANT (Android-specific)**: Two things must be in place before `connectBleDevice(...)` or the secure handshake fails —
1. The partner RSA key pair must have arrived (`initSDK` fetches it; poll `NiceBuildSdk.isPartnerDataReady()`)
2. The serial number must be signed and stored with `NiceBuildSdk.signAndStoreDeviceSn(deviceType, sn)`

**IMPORTANT**: Plaud devices can only be bound to **one application at a time**. Warn the user to **unbind the device before uninstalling their app** — otherwise it cannot be bound to another app (or the Plaud app) until it is recovered.

**NOTE**: Plaud devices record **up to 5 hours** per file. Longer recordings should be broken up.

Use the [Android SDK documentation](https://docs.plaud.ai/plaud-embedded/android-sdk.md) for the key methods and callbacks included in the SDK.

For behavior the high-level facades don't expose, see the [Advanced Android SDK usage docs](https://docs.plaud.ai/plaud-embedded/advanced-android-sdk.md), which cover the low-level `IBleAgent`, `NiceBuildSdk`, and `PartnerApiManager`. High-level and low-level facades can be mixed, but **`PlaudDeviceAgent` should stay the main driver** — it handles response management, callback plumbing, the audio pipeline (download, cache, E2EE decrypt, transcode), and firmware orchestration.

For further reference, explore:

* The [SDK repo](https://github.com/Plaud-AI/plaud-sdk-public/tree/main/sdk/android) containing the pre-built [`plaud-sdk.aar`](https://github.com/Plaud-AI/plaud-sdk-public/blob/main/sdk/android/plaud-sdk.aar)
* The [Plaud Starter App](https://github.com/Plaud-AI/plaud-sdk-public/tree/main/android) with the Android Embedded SDK fully implemented
* The most relevant files to use as reference in the Starter App are:
    * [DeviceManager.kt](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/android/app/src/main/java/com/plaud/template/managers/DeviceManager.kt)
    * [SyncManager.kt](https://raw.githubusercontent.com/Plaud-AI/plaud-sdk-public/refs/heads/main/android/app/src/main/java/com/plaud/template/managers/SyncManager.kt)

## Definition of Done - Completed Implementation of the Embedded SDK
When the user can: 
- [ ] Connect Plaud devices to their mobile app
- [ ] Sync audio files from Plaud devices to their app via BLE or WiFi fast transfer
- [ ] Unbind a Plaud device from their app (over both cloud and BLE)
