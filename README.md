# Django Linktree Demo

![Django Linktree Demo](demo.gif)

Welcome to the Django Linktree Demo! This project consists of a Django backend and a React frontend, together creating a simple demonstration of a linktree website. A linktree is a convenient way to share multiple links with your audience through a single URL, often used by individuals and businesses on social media platforms.

**Please note that this project is currently under development. While many features are functional, some features, such as link reordering, are yet to be fully implemented. Additionally, there might be occasional non-breaking errors as development progresses, which will be addressed over time.**

## Features

- Create a personalized list of links.
- Customize each link with a title and destination URL.
- Rearrange the order of the links using an intuitive interface (*feature in progress*).
- Responsive design for seamless viewing on various devices.

## Installation and Setup

To test the Django Linktree Demo on your local machine, follow these steps:

### Prerequisites

Before you begin, make sure you have the following installed:

- Python
- pip (Python package manager)
- Node.js (with npm, the Node.js package manager)

### Step 1: Clone the Repository

Open your terminal and navigate to the directory where you want to store the project. Then, run the following command to clone the repository:

```bash
git clone https://github.com/Minenhle-Ngubane/django-linktree-demo
```

### Step 2: Create a Virtual Environment (Optional but Recommended)
Navigate into the project directory:
```bash 
cd django-linktree-demo
```

Create a virtual environment to isolate project dependencies:
```bash 
python -m venv venv
```

Activate the virtual environment:

On macOS or Linux:
```bash 
source venv/bin/activate
```

On Windows (Command Prompt)::
```bash 
venv\Scripts\activate
```

### Step 3: Install Backend Dependencies
While in the project directory and with your virtual environment activated, install the required backend dependencies using pip:

```bash
pip install -r requirements.txt
```
### Step 4: Configure the Database and Start Django Server
By default, the project uses a SQLite database. Initialize the database by running the following command:

```bash
python manage.py migrate
```

### Step 5: Create Superuser to Access Admin Portal
```bash
python manage.py createsuperuser
```

### Step 6: Start Development Server
```bash
python manage.py runserver
```
This will start the backend development server at http://127.0.0.1:8000/.

### Step 7: Install and Run the React Frontend
Navigate to the "frontend" directory:
```bash
cd frontend
```

Install the required frontend dependencies using npm:
```bash
npm install
```

Start the React development server:
```bash
npm start
```
This will start the frontend development server, and you should see output indicating that the server is running. Open your web browser and go to http://localhost:3000 to access the Django Linktree Demo React Frontend.


## License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy exploring the Django Linktree Demo with its integrated Django backend and React frontend! If you have any questions or need further assistance, don't hesitate to reach out.

*Disclaimer: This is a fictional demo project created for illustrative purposes.*