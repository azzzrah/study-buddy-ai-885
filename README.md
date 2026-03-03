
# Study Buddy AI

## An Explainable Adaptive Learning Intelligence Platform

---

## 1. Overview

Study Buddy AI is a full-stack AI-powered learning intelligence system that transforms static study materials into an adaptive, explainable, and mastery-driven learning experience.

Students upload PDF study materials. The system:

* Generates structured multiple-choice quizzes using GPT-4o
* Tracks question-level mastery over time
* Detects careless mistakes
* Identifies poorly-done questions
* Measures long-term confidence stability
* Adapts future quizzes based on evolving learning patterns
* Repeats weak questions until mastery is achieved

Unlike traditional platforms that only track scores, Study Buddy AI models a student’s evolving learning state and provides actionable, transparent guidance.

---

## 2. Problem Motivation

Modern digital learning platforms collect extensive interaction data (timestamps, attempts, scores, topics), yet students often lack meaningful insight into:

* Which concepts they genuinely misunderstand
* Whether they are improving or stagnating
* Why they repeatedly make similar mistakes
* What to prioritize under time constraints

Learning is non-linear. Students experience inactivity gaps, bursts of revision, and fluctuating understanding.

This system models learning longitudinally and provides structured, explainable intervention logic rather than static performance summaries.

---

## 3. Core Innovations

### 3.1 Deterministic Mastery Tracking Engine

Instead of relying on opaque scoring systems, the platform maintains per-question learning states using structured metrics:

* `total_attempts`
* `correct_count`
* `consecutive_correct`
* `avg_time_seconds`
* `is_confident`
* `is_poorly_done`
* `is_careless_flagged`

Mastery evolves through:

* Consecutive correctness tracking
* Non-consecutive confidence validation across sessions
* Time-normalized performance evaluation

This ensures interpretability and deterministic behavior.

---

### 3.2 Careless Mistake Detection

A question is flagged as careless when:

* The student previously answered it correctly three or more times
* The current attempt is incorrect
* The time taken is less than 70% of the student’s average response time

This differentiates between conceptual misunderstanding and rushed errors, addressing a common real-world learning issue.

---

### 3.3 Poorly-Done Question Recovery Loop

If a student answers incorrectly and has not achieved three consecutive correct responses:

* `is_poorly_done = true`

Retry quizzes prioritize poorly-done questions until:

* Three consecutive correct answers are achieved

This enforces mastery rather than superficial improvement.

---

### 3.4 Confidence Modeling

Confidence is derived from:

* Correctness across sessions
* Hint usage
* Time taken

Questions are classified as confident when:

* Correctly answered three or more times non-consecutively

A visual confidence meter reflects long-term stability rather than short-term performance spikes.

---

### 3.5 Structured AI Quiz Generation

OpenAI GPT-4o is used with strict schema validation to generate structured MCQs from uploaded PDFs.

Each question contains:

* Four structured answer options
* Correct answer index
* Explanation
* Three progressive hints
* Topic label
* Difficulty level

The language model is used strictly for content generation. All mastery decisions remain deterministic and rule-based.

---

## 4. System Architecture

### 4.1 Frontend

* Next.js 16 (App Router)
* TypeScript
* shadcn/ui
* Tailwind CSS

### 4.2 Backend

* Supabase (Postgres)
* Supabase Authentication
* Row-Level Security (RLS)
* Server Actions for mastery updates

### 4.3 AI Layer

* OpenAI GPT-4o
* AI SDK 6
* Structured JSON schema validation

### 4.4 Data Flow

PDF Upload
→ GPT-4o Structured Quiz Generation
→ Questions Stored in Supabase
→ Quiz Session Tracking
→ Mastery Engine Updates
→ Adaptive Retry and Analytics Dashboard

---

## 5. Database Design

Primary tables:

* `subjects`
* `questions`
* `quiz_sessions`
* `question_attempts`
* `question_mastery`

All tables enforce Row-Level Security policies scoped to:

```
auth.uid() = user_id
```

This guarantees strict per-user data isolation.

---

## 6. Analytics and Adaptation

The system provides:

* Topic-wise conceptual heatmaps
* Careless versus poorly-done segmentation
* Attempt history line charts
* Confidence meter visualization
* Retry-until-mastery mode
* Adaptive quiz prioritization

Quiz regeneration prioritizes:

1. Poorly-done questions
2. Reinforcement of confident questions
3. Mixed difficulty for retention

---

## 7. Responsible AI in Education

Trust and transparency are core design principles.

### 7.1 Explainability

* Deterministic mastery logic
* Explicit careless detection rules
* Transparent retry criteria
* Clear performance breakdowns

### 7.2 Minimal Data Usage

* Only interaction-level data stored
* No cross-user profiling
* No external tracking mechanisms

### 7.3 Privacy and Security

* Supabase Row-Level Security
* Per-user data isolation
* No shared analytics across users

### 7.4 Deterministic Decision-Making

* Mastery updates are rule-based
* LLM outputs do not determine learning state
* Content generation is separated from adaptation logic

### 7.5 Human Agency

* Students can manually retry quizzes
* Recommendations are advisory, not enforced
* Performance history is visible and reviewable

---

## 8. Setup Instructions

### 8.1 Clone Repository

```
git clone https://github.com/azzzrah/study-buddy-ai-885.git
cd study-buddy-ai-885
```

### 8.2 Install Dependencies

```
npm install
```

### 8.3 Create `.env.local`

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
```

### 8.4 Run Development Server

```
npm run dev
```

Application runs at:

```
http://localhost:3000
```

---

## 9. Testbench Guide

Refer to:

```
/testbench/TESTING_GUIDE.md
```

To test core features:

1. Register a new account
2. Upload `sample_input.pdf`
3. Generate quiz questions
4. Complete a quiz
5. Observe:

   * Careless mistake detection
   * Poorly-done prioritization
   * Retry-until-full-marks mode
   * Confidence tracking
   * Topic-level analytics

---

## 10. Real-World Applicability

This system is designed for longitudinal usage:

* Tracks performance across multiple sessions
* Supports inactivity and repetition cycles
* Reinforces mastery rather than surface scoring
* Scales across subjects and time horizons

It is suitable for use over weeks or months of sustained study.

---

## 11. Technology Stack

* Next.js
* TypeScript
* Supabase
* PostgreSQL
* OpenAI GPT-4o
* AI SDK 6
* shadcn/ui
* Tailwind CSS
* Recharts

---

## 12. Demo Video

Insert video link here.

---

## 13. Team Members

Azzrah, Sahana, Jona, April, Sandhya



