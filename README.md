# Plaud Embedded Skills

Plaud Embedded Skills are a set of skills for your coding agents to implement the Plaud's Embedded SDK and Transcription API. 

By the end of your coding session, your agent should be able to:

- [ ] Guide you through project setup and authentication to Plaud services

- [ ] Connect your mobile app to any [Plaud device](https://docs.plaud.ai/plaud-embedded/devices)

- [ ] Apply Plaud's ASR and Speech-to-text models to recorded audio via the [Transcription API](https://docs.plaud.ai/plaud-embedded/transcription-api-overview)

![Agent Use](/assets/agent-ss.png)

## Installation

### Installing via the Skills CLI (Recommended method)

The Skills CLI by Vercel automatically adds Plaud Embedded Skills to your coding agent. See the manual installation section if needed.

```bash
npx skills add Plaud-AI/plaud-embedded-skills
```

Update the Skill with the following command:

```bash
npx skills update
```

### Manual Installation

1. Navigate to the skills directory of your agentic IDE

```bash
//for example
~/.cursor/skills/
~/.claude/skills/
~/.agents/skills/
~/.config/opencode/skills/
```

2. Clone this repo

## Starter Prompts

```prompt
How does Plaud Embedded work?

How do I get my Plaud credentials?

Setup Plaud auth for my app

Deploy the Plaud iOS starter app

Set up device connection to Plaud devices

Implement the Transcription API logic
```
