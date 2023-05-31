AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 1000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

          //enemyBullet entity
          var enemyBullet = document.createElement("a-entity");

          enemyBullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.5,
          });

          enemyBullet.setAttribute("material", "color", "red");

          var position = els[i].getAttribute("position")

          enemyBullet.setAttribute("position", {
            x: position.x + 1.5,
            y: position.y + 3.5,
            z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            var enemy = els[i].object3D
            var weapon = document.querySelector('#weapon').object3D

            //Three.js Vector Variables
            var enemyVec = new THREE.Vector3()
            var playerVec = new THREE.Vector3()

            //Get enemy and player position using Three.js methods
            enemy.getWorldPosition(enemyVec)
            weapon.getWorldPosition(playerVec)

            //set the velocity and it's direction
            var direction = new THREE.Vector3()
            direction.subVectors(enemyVec, playerVec).normalize()
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(-10));
            
            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body", {mass: 0});

            //Get text attribute
            var playerLife = document.querySelector('#countLife')

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
              if (e.detail.body.el.id === "weapon") {
                var lifeCount = parseInt(playerLife.getAttribute('text').value)
                //Add the conditions here
                if(lifeCount == 0){
                  var gameOver = document.querySelector('#over')
                  gameOver.setAttribute('visible', true)
                  var scene = document.querySelector('#scene')
                  var enemies = document.querySelectorAll('.enemy')

                  enemies.forEach(enemy => {
                    scene.removeChild(enemy)
                  });
                }else{
                  lifeCount -= 1
                  playerLife.setAttribute('text', {value: lifeCount})
                }
              }
            });

        }
    }
});