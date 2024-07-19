### 1. **User APIs**



#### a. Register User



- **Endpoint:** POST /api/auth/register

- **Payload:** 

    ```json

    {

        "username": "string",

        "email": "string",

        "password": "string",

        "firstName": "string",

        "lastName": "string"

    }

    ```

- **Responses:**

    - **Success (201):**

        ```json

        {

            "id": "string",

            "username": "string",

            "email": "string",

            "firstName": "string",

            "lastName": "string",

            "createdAt": "integer",

            "role": "user"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "string"

        }

        ```

    - **Conflict (409):**

        ```json

        {

            "error": "User already exists"

        }

        ```



#### b. Login User



- **Endpoint:** POST /api/auth/login

- **Payload:**

    ```json

    {

        "email": "string",

        "password": "string"

    }

    ```

- **Responses:**

    - **Success (200):**

        ```json

        {

            "token": "string",

            "user": {

                "id": "string",

                "username": "string",

                "email": "string",

                "firstName": "string",

                "lastName": "string",

                "role": "string"

            }

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid email or password"

        }

        ```



#### c. Get User Profile



- **Endpoint:** GET /api/profile

- **Headers:** 

    - Authorization: Bearer `token`

- **Responses:**

    - **Success (200):**

        ```json

        {

            "id": "string",

            "username": "string",

            "email": "string",

            "firstName": "string",

            "lastName": "string",

            "createdAt": "timestamp",

            "role": "string"

        }

        ```

    - **Unauthorized (401):**

        ```json

        {

            "error": "Unauthorized"

        }

        ```



#### d. Change Password



- **Endpoint:** PUT /api/auth/change-password

- **Headers:** 

    - Authorization: Bearer `token`

- **Payload:**

    ```json

    {

        "oldPassword": "string",

        "newPassword": "string"

    }

    ```

- **Responses:**

    - **Success (200):**

        ```json

        {

            "message": "Password changed successfully"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```

    - **Unauthorized (401):**

        ```json

        {

            "error": "Unauthorized"

        }

        ```



#### e. Update Profile



- **Endpoint:** PUT /api/profile

- **Headers:** 

    - Authorization: Bearer `token`

- **Payload:**

    ```json

    {

        "username": "string",

        "email": "string",

        "firstName": "string",

        "lastName": "string"

    }

    ```

- **Responses:**

    - **Success (200):**

        ```json

        {

            "id": "string",

            "username": "string",

            "email": "string",

            "firstName": "string",

            "lastName": "string",

            "role": "string"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```

    - **Unauthorized (401):**

        ```json

        {

            "error": "Unauthorized"

        }

        ```



#### f. Get Recovery Key



- **Endpoint:** POST /api/auth/recovery-key

- **Payload:**

    ```json

    {

        "email": "string"

    }

    ```

- **Responses:**

    - **Success (200):**

        ```json

        {

            "recoveryKey": "string"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid email"

        }

        ```



#### g. Reset Password



- **Endpoint:** POST /api/auth/reset-password

- **Payload:**

    ```json

    {

        "recoveryKey": "string",

        "email": "string",

        "newPassword": "string"

    }

    ```

- **Responses:**

    - **Success (200):**

        ```json

        {

            "message": "Password reset successfully"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```



### 2. **Product APIs**



#### a. Get All Products



- **Endpoint:** GET /api/products

- **Query Parameters:** 

    - `page`: integer (default: 1)

    - `limit`: integer (default: 10)

    - `search`: string (optional)

    - `sort`: string (optional, e.g., price_asc, price_desc, name_asc, name_desc)

- **Response:**

    - **Success (200):**

        ```json

        {

            "products": [

                {

                    "id": "string",

                    "name": "string",

                    "description": "string",

                    "price": "number",

                    "stock": "number",

                    "category": "string",

                    "imageUrl": "string"

                }

            ],

            "pagination": {

                "currentPage": "integer",

                "totalPages": "integer",

                "totalItems": "integer",

                "limit": "integer"

            }

        }

        ```



#### b. Get Product by ID



- **Endpoint:** GET /api/products/{id}

- **Responses:**

    - **Success (200):**

        ```json

        {

            "id": "string",

            "name": "string",

            "description": "string",

            "price": "number",

            "stock": "number",

            "category": "string",

            "imageUrl": "string"

        }

        ```

    - **Not Found (404):**

        ```json

        {

            "error": "Product not found"

        }

        ```



### 3. **Order APIs**



#### a. Create Order



- **Endpoint:** POST /api/orders

- **Headers:** 

    - Authorization: Bearer `token`

- **Payload:**

    ```json

    {

        "productIds": ["string"],

        "shippingAddress": {

            "street": "string",

            "city": "string",

            "state": "string",

            "zipCode": "string",

            "country": "string"

        },

        "paymentMethod": "string"

    }

    ```

- **Responses:**

    - **Success (201):**

        ```json

        {

            "orderId": "string",

            "status": "string",

            "totalAmount": "number",

            "items": [

                {

                    "productId": "string",

                    "quantity": "number",

                    "price": "number"

                }

            ],

            "shippingAddress": {

                "street": "string",

                "city": "string",

                "state": "string",

                "zipCode": "string",

                "country": "string"

            },

            "paymentMethod": "string",

            "createdAt": "timestamp"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```



#### b. Get Order by ID



- **Endpoint:** GET /api/orders/{id}

- **Headers:** 

    - Authorization: Bearer `token`

- **Responses:**

    - **Success (200):**

        ```json

        {

            "orderId": "string",

            "status": "string",

            "totalAmount": "number",

            "items": [

                {

                    "productId": "string",

                    "quantity": "number",

                    "price": "number"

                }

            ],

            "shippingAddress": {

                "street": "string",

                "city": "string",

                "state": "string",

                "zipCode": "string",

                "country": "string"

            },

            "paymentMethod": "string",

            "createdAt": "timestamp"

        }

        ```

    - **Not Found (404):**

        ```json

        {

            "error": "Order not found"

        }

        ```



### 4. **Category APIs**



#### a. Get All Categories



- **Endpoint:** GET /api/categories

- **Query Parameters:** 

    - `page`: integer (default: 1)

    - `limit`: integer (default: 10)

    - `search`: string (optional)

- **Response:**

    - **Success (200):**

        ```json

        {

            "categories": [

                {

                    "id": "string",

                    "name": "string",

                    "description": "string"

                }

            ],

            "pagination": {

                "currentPage": "integer",

                "totalPages": "integer",

                "totalItems": "integer",

                "limit": "integer"

            }

        }

        ```



### 5. **Product by Category APIs**



#### a. Get Products by Category



- **Endpoint:** GET /api/categories/{id}/products

- **Query Parameters:** 

    - `page`: integer (default: 1)

    - `limit`: integer (default: 10)

    - `search`: string (optional)

    - `sort`: string (optional, e.g., price_asc, price_desc, name_asc, name_desc)

- **Response:**

    - **Success (200):**

        ```json

        {

            "products": [

                {

                    "id": "string",

                    "name": "string",

                    "description": "string",

                    "price": "number",

                    "stock": "number",

                    "category": "string",

                    "imageUrl": "string"

                }

            ],

            "pagination": {

                "currentPage": "integer",

                "totalPages": "integer",

                "totalItems": "integer",

                "limit": "integer"

            }

        }

        ```



### 6. **Admin APIs**



#### a. Get All Users



- **Endpoint:** GET /api/admin/users

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Query Parameters:** 

    - `page`: integer (default: 1)

    - `limit`: integer (default: 10)

    - `search`: string (optional)

- **Response:**

    - **Success (200):**

        ```json

        {

            "users": [

                {

                    "id": "string",

                    "username": "string",

                    "email": "string",

                    "firstName": "string",

                    "lastName": "string",

                    "role": "string",

                    "createdAt": "timestamp"

                }

            ],

            "pagination": {

                "currentPage": "integer",

                "totalPages": "integer",

                "totalItems": "integer",

                "limit": "integer"

            }

        }

        ```



#### b. Update User Role



- **Endpoint:** PUT /api/admin/users/{id}/role

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Payload:**

    ```json

    {

        "role": "string"

    }

    ```

- **Responses:**

    - **Success (200):**

        ```json

        {

            "id": "string",

            "username": "string",

            "email": "string",

            "firstName": "string",

            "lastName": "string",

            "role": "string"

        }

        ```

    - **Not Found (404):**

        ```json

        {

            "error": "User not found"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```



#### c. Delete User



- **Endpoint:** DELETE /api/admin/users/{id}

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Responses:**

    - **Success (200):**

        ```json

        {

            "message": "User deleted successfully"

        }

        ```

    - **Not Found (404):**

        ```json

        {

            "error": "User not found"

        }

        ```



#### d. Create Product



- **Endpoint:** POST /api/admin/products

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Payload:**

    ```json

    {

        "name": "string",

        "description": "string",

        "price": "number",

        "stock": "number",

        "category": "string",

        "imageUrl": "string"

    }

    ```

- **Responses:**

    - **Success (201):**

        ```json

        {

            "id": "string",

            "name": "string",

            "description": "string",

            "price": "number",

            "stock": "number",

            "category": "string",

            "imageUrl": "string"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```



#### e. Update Product



- **Endpoint:** PUT /api/admin/products/{id}

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Payload:**

    ```json

    {

        "name": "string",

        "description": "string",

        "price": "number",

        "stock": "number",

        "category": "string",

        "imageUrl": "string"

    }

    ```

- **Responses:**

    - **Success (200):**

        ```json

        {

            "id": "string",

            "name": "string",

            "description": "string",

            "price": "number",

            "stock": "number",

            "category": "string",

            "imageUrl": "string"

        }

        ```

    - **Not Found (404):**

        ```json

        {

            "error": "Product not found"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```



#### f. Delete Product



- **Endpoint:** DELETE /api/admin/products/{id}

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Responses:**

    - **Success (200):**

        ```json

        {

            "message": "Product deleted successfully"

        }

        ```

    - **Not Found (404):**

        ```json

        {

            "error": "Product not found"

        }

        ```



#### g. Create Category



- **Endpoint:** POST /api/admin/categories

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Payload:**

    ```json

    {

        "name": "string",

        "description": "string"

    }

    ```

- **Responses:**

    - **Success (201):**

        ```json

        {

            "id": "string",

            "name": "string",

            "description": "string"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```



#### h. Update Category



- **Endpoint:** PUT /api/admin/categories/{id}

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Payload:**

    ```json

    {

        "name": "string",

        "description": "string"

    }

    ```

- **Responses:**

    - **Success (200):**

        ```json

        {

            "id": "string",

            "name": "string",

            "description": "string"

        }

        ```

    - **Not Found (404):**

        ```json

        {

            "error": "Category not found"

        }

        ```

    - **Client Error (400):**

        ```json

        {

            "error": "Invalid input data"

        }

        ```



#### i. Delete Category



- **Endpoint:** DELETE /api/admin/categories/{id}

- **Headers:** 

    - Authorization: Bearer `admin-token`

- **Responses:**

    - **Success (200):**

        ```json

        {

            "message": "Category deleted successfully"

        }

        ```

    - **Not Found (404):**

        ```json

        {

            "error": "Category not found"

        }

        ```

