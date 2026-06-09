# Raja Jaiswal - Full Stack Developer Portfolio & Backend Service

A premium, modern, fully responsive software engineering portfolio built with React and Framer Motion, integrated with a Spring Boot microservice for handling secure contact inquiries and real-time Gmail SMTP notifications.

---

## 🚀 Technology Stack

### Frontend
* **Core**: React 19, TypeScript, HTML5
* **Styling**: Tailwind CSS v4 (Glassmorphism & custom dark accents)
* **Animations**: Framer Motion & React Icons
* **Routing**: Active scroll spier and single-page section indicators

### Backend
* **Core**: Spring Boot 3.3.0, Java 17
* **Validation**: Jakarta Bean Validation (`@Valid`, `@Email`, `@NotBlank`, `@Size`)
* **Notification**: Spring Mail (`JavaMailSender`) with Gmail SMTP integration
* **Security & Exception Handling**: `@RestControllerAdvice` mapping validation fields and mail transport exceptions into structured JSON envelopes

---

## 🛠️ Project Structure

* `/portfolio` — Client-side React application.
* `/backend` — Server-side Spring Boot API.

---

## 🔧 Installation & Configuration

### Prerequisites
* Node.js (v18+)
* Java JDK 17+
* Maven (v3+)

### 1. Run the Spring Boot Backend
Configure your SMTP details in `backend/src/main/resources/application.yml` or run with environment variables:

```bash
cd backend
GMAIL_USERNAME="your-email@gmail.com" \
GMAIL_PASSWORD="your-16-char-app-password" \
ADMIN_EMAIL="your-email@gmail.com" \
mvn spring-boot:run
```
The server will boot on `http://localhost:8080`.

### 2. Run the React Frontend
Install dependencies and launch the dev environment:

```bash
cd portfolio
npm install
npm run dev
```
The client page will open on `http://localhost:5173`.
