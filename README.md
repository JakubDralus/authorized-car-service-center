# Authorized Car Service Center

Platform for an authorized car service center that contains a website as well as a 
system that supports an internal management system for scheduling tasks among employees.

This was a university project done in a team of 4 students: <br>
[@JakubDralus](https://github.com/JakubDralus)
[@Veczar](https://github.com/Veczar)
[@luukis](https://github.com/lukiiis)
[@zysio](https://github.com/zysio)

## Table of contents

1. [Website](#website)
2. [Main Product Features](#main-product-features)
3. [Technologies Used](#technologies-used)

## Website

### Home page
![img](https://github.com/user-attachments/assets/666fbcef-780c-40ca-9f50-dafa09c7dec4)


### Services
![img_2](https://github.com/user-attachments/assets/0d6c6eaa-82ad-4e3d-bc74-f25c1db175af)

### Ticket Form
![img_3](https://github.com/user-attachments/assets/41e56619-2cbf-46c6-acad-e09e8e6c6559)

![img_4](https://github.com/user-attachments/assets/004c7e8e-e342-455b-814b-c25fa46b2abf)

### Dashboard
![img_5](https://github.com/user-attachments/assets/a9c5d92a-ce07-4572-a38b-28690e25dd10)

![img_6](https://github.com/user-attachments/assets/f911250b-f528-4cb1-8532-f31982e6aa01)

![img_8](https://github.com/user-attachments/assets/b1c96834-8f8e-4d02-91cc-8b5fa14fb454)

### Login page
![img_9](https://github.com/user-attachments/assets/d408862b-8ebf-4a28-9f8d-bd2ab4a9d4e5)

### Contact and footer
![img_1](https://github.com/user-attachments/assets/909dfa1a-e712-4480-8e5b-430bf1cdc0fa)

## Main Product Features

The system includes the following functionalities:

1. **Customer Registration:** The system allows for the registration of customers, collecting 
their contact information and service history.

2. **Repair Orders:** Ability to create and manage repair orders, including specifying the 
type of repair, deadlines, and assigning mechanics to specific tasks.

3. **Scheduling:** The system allows for creating work schedules for workshop staff, taking into 
account the availability of mechanics and repair deadlines.

4. **Customer Service:** Providing customers with access to information about the status of their 
vehicle repairs and the ability to communicate with the workshop through the system.

5. **Invoicing and Settlements:** Generating invoices for customers based on completed repairs, 
tracking payments, and settlements with mechanics.

6. **Reporting and Analysis:** The system allows for generating reports on workshop performance, 
repair costs, financial turnover, and other key indicators.

## Technologies Used
backend:
- Java 17
- Spring Boot 3.2.4 (starter parent)
- Hibernate 6.4
- Spring Security 6.2
- AWS S3 (with aws sdk 2.20.26)
- PostgreSQL
- Docker

frontend:
- React 18.3.1
- Typescript 4.9.5
- Tailwind 3.4.3
