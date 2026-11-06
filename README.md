# Ice Cream Shop POS & Management System (v2)

An end-to-end full-stack web application designed to manage sales, inventory, and customer orders for an ice cream parlor. Built with a robust **Python/Django** backend and a dynamic **React/Vite** frontend.

* **Live Frontend Demo:** (https://heladeria-smo-v2.vercel.app)

---

## Status: Production-Ready Architecture (~85% Complete)

The core architectural components, relational database management, and client ordering workflows are fully structured and operational. 

> **Architecture Note:** The user interface and client-side presentation are deployed on Vercel for immediate public preview. The full-stack architecture incorporates a Django backend, SQLite database, and custom React hooks (`useCarrito`) to manage complex product rules (such as dynamic flavor limits per container size like 4 flavors for 1/2 KG pots) and local currency formatting (ARS).

---

## Key Features

* **Advanced Order & Container Management:** POS workflow supporting precise item selection, real-time cart calculations, dynamic flavor constraints (up to 4 flavors for 1/2 KG pots), and automated WhatsApp order formatting.
* **Payment Gateway Integration:** Integrated with Mercado Pago API for processing real-time local transactions.
* **Robust Backend Logic:** Powered by Python and Django to manage REST APIs, business rules, and secure data handling.
* **Dynamic Frontend UI:** Built with React, Vite, and modern CSS for a highly responsive, touch-friendly user experience across mobile and desktop devices.
* **Relational Database:** Out-of-the-box data storage utilizing SQLite for fast query processing and easy local setup.

---

## Tech Stack

* **Backend:** Python, Django
* **Frontend:** React, Vite, HTML5, CSS3, JavaScript (ES6+)
* **Database:** SQLite
* **Deployment:** Vercel (Frontend UI Preview) & Local Full-Stack Execution

---

## Local Installation & Setup

To run the full-stack application locally with database support:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/FernandoSantos-7/heladeria-smo-v2.git](https://github.com/FernandoSantos-7/heladeria-smo-v2.git)
   cd heladeria-smo-v2
