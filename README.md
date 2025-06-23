# 🐟 Proyecto\_FRONT\_SpringBoot

**Interfaz Web del Sistema de Gestión – Atunes del Pacífico S.A.**

Este repositorio contiene el **front-end** del sistema empresarial de Atunes del Pacífico S.A., desarrollado con React, y utilizando **HTML, CSS y JavaScript puro**. Este cliente web permite a los usuarios interactuar con el sistema a través de una interfaz amigable, consumiendo los endpoints del back-end mediante `fetch`.

---

## 📌 Descripción General

Este sitio permite a clientes, operadores y administradores gestionar las operaciones de la empresa según su rol:

* **Clientes**: pueden registrarse, iniciar sesión y realizar pedidos.
* **Operadores**: acceden al módulo de inventario y seguimiento de pedidos.
* **Administradores**: gestionan usuarios, clientes y reportes del sistema.

---

## 🧰 Tecnologías Utilizadas

* HTML5
* CSS3
* JavaScript ES6
* `fetch()` para consumo de API REST
* Diseño adaptable (responsive)
* No se utilizan frameworks ni librerías externas

---

## 🧑‍💻 Funcionalidades Principales

* **Inicio de sesión y registro** con JWT
* **Gestión de pedidos** desde el rol Cliente
* **Consulta de inventario** para Operadores
* **Carga de nuevos lotes** (Producción)
* **Panel de administración** con gestión de usuarios, clientes y reportes (solo para Admin)
* **Visualización de reportes** (ventas, defectuosos, stock)

---

## 🗂️ Estructura del Proyecto

Este repositorio contiene páginas HTML separadas para cada módulo:

* `index.html`: Página de inicio / login
* `registro.html`: Registro de usuarios
* `pedidos.html`: Gestión de pedidos
* `inventario.html`: Consulta de productos
* Archivos `.js` asociados para cada vista (modularizados)
* Archivo `style.css` para estilos generales

---

## ⚙️ Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Jinderarias1303/ProyectoFrontSpring
   ```

2. Modifica en los archivos `.js` las URLs base si el backend no está en `localhost`.

3. Coloca los archivos en un servidor web como **Apache HTTP Server** o cualquier otro servicio estático.

---

## 📄 Contenido

* Archivos HTML, CSS y JS modularizados.
* Interfaz responsive sin frameworks.
* Código documentado con comentarios.
* README explicativo con pasos de conexión.


