Each camp ground has:
* name
* image

RESTFUL ROUTES

name      url               verb           description
===============================================
INDEX     /dogs             GET            display a list of all dogs
NEW       /dogs/new         GET            display form to make a new dog
CREATE    /dogs             POST           add a new dog to DB
SHOW      /dogs/:id         GET            show the details of specific item
EDIT      /dogs/:id/edit    GET            show edit foe one dog
Update    /dogs/:id         PUT            update a particular dog, then redirect somewhere
Destroy   /dogs/:id         DELETE         delete a particular dog and then redirect somewhere

REST - a mapping between HTTP routes and CRUD
    name      url                  verb           description
================================================
C - CREATE                         POST     
R - READ     /allBlogs             GET
U - UPDATE   /updateBlog/:id       PUT
D - DELETE   /destroyBlog/:id      DELETE