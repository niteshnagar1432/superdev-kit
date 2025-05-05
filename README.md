# 🔧 superdev-kit

A lightweight utility kit for modern developers. Includes handy tools like:

- ✅ HTTP Status Code Constants with Messages  
- 🌐 Custom Axios Wrapper (`MyApi`)  
- 📅 Date Formatter with `format` and `timeAgo` support  
- 🎞️ Video-to-Image Frame Cropper
- ☁️ Amazon S3 Utility – Upload, multipart upload, and delete support

---

## 📦 Installation

```bash
npm install superdev-kit
```

## 🚀 Getting Started
First, import the functions and utilities you need from the package:

```bash
import { init, getConfig } from "superdev-kit";
```

## 🛠️ Initialize the SDK

To start using the SDK, you need a **SuperDev Access Key**.  
If you don't have one yet, you can get it from [https://superdev.in](https://superdev.in).

Once you have the key, initialize the SDK like this:

```js
import { init, getConfig } from "superdev-kit";

init("your-superdev-access-key"); // Get your key from https://superdev.in
```

You will see a success log in the console:

```bash
✅ superdev-kit initialized
```

---

## ⚙️ Getting Configuration

Use `getConfig()` to retrieve your current setup and defaults.

```js
async function checkConfigData() {
  let config = await getConfig();
  console.log(config);
}
```

### 🧾 Output Structure:

```json
{
  "api_config": {
    "base_url": ""
  },
  "status_code_config": {
    "status_code": true,
    "status_message": true,
    "status_boolean": true
  },
  "s3_config": {
    "bucket_name": "",
    "access_key_id": "",
    "secret_access_key": "",
    "region": "",
    "project_name": ""
  }
}
```

## 📦 Status Code Utilities

The `getStatus(code, options?)` function returns structured information about HTTP status codes.

### 🛠 Usage

```js
import { init, getStatus } from "superdev-kit";

init("superdev-access-key", {
  status_code_config: {
    status_boolean: true,
    status_code: true,
    status_message: true
  }
});

let status = getStatus(201);
console.log(status);

// Output:
{
  status: true,
  status_code: 201,
  message: "Created"
}

status = getStatus(201, { status_message: true });
console.log(status);

// Output:
{
  message: "Created"
}

status = getStatus(201, { status_boolean: true, status_message: true });
console.log(status);

// Output:
{
  status: true,
  message: "Created"
}
```

✅ This gives you flexibility to return only the fields you need.

## 📅 Date Formatting Utility

The `formatDate(date, options?)` function supports standard formatting and relative time ("time ago") formatting.

### 🛠 Usage

```js
import { init, formatDate } from "superdev-kit";

init("superdev-access-key", {
  date_config: {
    formatDate: "YYYY-MM-DD HH:mm:ss",
  }, // Overrides the default config
});

let date = formatDate(new Date());
console.log(date);

// Output:
// 2025-05-05 13:19:13

date = formatDate(new Date(), { timeAgo: true });
console.log(date);

// Output:
// just now

date = formatDate(new Date('2023-05-05'), { timeAgo: true });
console.log(date);

// Output:
// 2 years ago

date = formatDate('2023-05-05', { format: 'YYYY-MM-DD' });
console.log(date);

// Output:
// 2023-05-05

date = formatDate('2023-05-05', { format: 'YYYY-MMM-DD HH:mm:ss' });
console.log(date);

// Output:
// 2023-May-05 05:30:00
```

✅ You can control default and custom formatting per-call.

## 🌐 Custom Axios Wrapper – `MyAPI`

The `superdev-kit` provides a powerful and streamlined API utility `MyAPI` built over Axios, making HTTP requests cleaner and more consistent. It supports GET, POST, PUT, DELETE, PATCH, and proxying remote media content.

### 🔧 Configuration

```js
import { init, MyAPI } from "superdev-kit";

init("superdev-access-key", {
  api_config: {
    base_url: "http://example.com",
  },
});
```

> ℹ️ `access-token` is optional and can be omitted if not required.

---

### 📥 GET Request

```js
const getData = async () => {
  const response = await MyAPI.GET("/data", "access-token");
  console.log(response);
};
```

✅ **Response:**
```json
{
  "status": 200,
  "message": "Success",
  "data": { /* fetched data */ },
  "error": null
}
```

---

### 📝 POST Request

```js
const createData = async () => {
  const response = await MyAPI.POST("/data", { name: "John Doe" }, "access-token");
  console.log(response);
};
```

✅ **Response:**
```json
{
  "status": 201,
  "message": "Created",
  "data": { /* created record */ },
  "error": null
}
```

---

### 🔄 PUT Request

```js
const updateData = async () => {
  const response = await MyAPI.PUT("/data/1", { name: "Jane Doe" }, "access-token");
  console.log(response);
};
```

---

### ❌ DELETE Request

```js
const deleteData = async () => {
  const response = await MyAPI.DELETE("/data/1", "access-token");
  console.log(response);
};
```

---

### 🔧 PATCH Request

```js
const patchData = async () => {
  const response = await MyAPI.PATCH("/data/1", { name: "Jane Doe" }, "access-token");
  console.log(response);
};
```

---

### 🖼️ Proxy Media Request

```js
const proxyMedia = async () => {
  const response = await MyAPI.Proxy_Media("https://example.com/image.jpg", "access-token");
  console.log(response);
};
```

✅ **Response:**
```json
{
  "data": <Buffer>, 
  "contentType": "image/jpeg"
}
```

> 📎 This is useful for bypassing CORS and serving external assets via your own backend securely.

---

**🔐 Note:** All methods accept an optional access token which, if provided, will be sent via `Authorization: Bearer` header.

