# @variablesoftware/vs-brand-utils 🏷️🧩🛡️

[![Test Suite](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/variablesoftware/vs-brand-utils/actions)
[![NPM version](https://img.shields.io/npm/v/@variablesoftware/vs-brand-utils?style=flat-square)](https://www.npmjs.com/package/@variablesoftware/vs-brand-utils)
[![License](https://img.shields.io/github/license/variablesoftware/vs-brand-utils?style=flat-square)](https://github.com/variablesoftware/vs-brand-utils/blob/main/LICENSE)

**Nominal (branded) TypeScript types & helpers for safe opaque types.**

🏷️🧩🛡️ Type-safe branding for primitives and objects in TypeScript.

---

# Usage Guide

See the [Usage Guide](./docs/usage.md) for practical examples and patterns.

# API Reference

See the [API Reference](./docs/api.md) for a summary of all exports and detailed documentation.

---

## 🔧 Installation

```bash
yarn add @variablesoftware/vs-brand-utils
```

---

## 🚀 Usage

```ts
import {
  Brand,
  brand,
  isBrand,
  assertBrand,
  unbrand,
  createBrand,
} from "@variablesoftware/vs-brand-utils";

// Define a branded type
export type UserId = Brand<"UserId", string>;

// Brand a value
const id = brand<"UserId", string>("abc123");

// Type-safe: cannot assign UserId to string or vice versa
// const s: string = id; // Type error
// const id2: UserId = 'plainstring'; // Type error

// Type guard
if (isBrand<"UserId", string>("UserId", id)) {
  // id is UserId here
}

// Assert
assertBrand<"UserId", string>("UserId", id);

// Unbrand
const raw: string = unbrand<"UserId", string>(id);

// Factory for a specific brand
const TenantId = createBrand<"TenantId", string>("TenantId");
const tid = TenantId.brand("t-123");
```

---

## ✨ Features

- 🏷️ Nominal/opaque types for primitives and objects
- 🧩 Type-safe branding and unbranding helpers
- 🛡️ Compile-time enforcement: prevents accidental mixing of branded and unbranded types
- Array helpers for batch branding/unbranding
- Factory for reusable brand helpers
- Zero runtime cost: all checks are type-level

---

## 🎯 Goals

- Prevent accidental mixing of IDs, tokens, and other primitives
- Enable safe domain modeling with TypeScript
- No runtime overhead or dependencies
- Simple, composable API

---

## 🧪 Test Coverage

Tested using `vitest` with coverage for:

- Branding and unbranding
- Type guards and assertions
- Compile-time type errors
- Array helpers

Run tests:

```bash
yarn test
```

---

## 🚧 Status

**This package is under active development and not yet stable.**

Once stable, it will be published as:

```json
"@variablesoftware/vs-brand-utils": "^0.1.0"
```

---

## 📄 License

MIT © Rob Friedman / Variable Software

---

> Built with ❤️ by [@variablesoftware](https://github.com/variablesoftware)  
> Thank you for downloading and using this project. Pull requests are warmly welcomed!

---

## 🌐 Inclusive & Accessible Design

- Naming, logging, error messages, and tests avoid cultural or ableist bias
- Avoids assumptions about input/output formats or encodings
- Designed for clarity, predictability, and parity with TypeScript best practices
- Works well in diverse, multilingual, and inclusive developer environments

---
