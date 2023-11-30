AFRAME.registerComponent('bowling-balls',{
    init: function(){
    this.shootBowlingball()
    },
    shootBowlingball: function(){
        window.addEventListener('keydown', (e)=>{
            console.log(e.key)
            if (e.key ==="z"){
                console.log('hello')
                var bowlingBall = document.createElement("a-entity");
                bowlingBall.setAttribute('geometry', {
                    primitive: 'sphere',
                    radius: 0.9
                })
                bowlingBall.setAttribute('material', 'color', 'black');

                var camera = document.querySelector('#camera')
                var position = camera.getAttribute('position')

                bowlingBall.setAttribute('position', {
                    x: position.x,
                    y: position.y-0.7,
                    z: position.z
                })
                var cam = document.querySelector('#camera').object3D
                var direction = new THREE.Vector3(0,1,-15)
                cam.getWorldDirection(direction)
                bowlingBall.setAttribute('velocity', direction.multiplyScalar(-20))
                var scene = document.querySelector('#scene');
                bowlingBall.setAttribute('dynamic-body', {
                    shape: 'sphere',
                    mass: '100',
                })
                bowlingBall.addEventListener('collide', this.removeBowlingBall)
                scene.appendChild(bowlingBall)
            }
        });
    },

    removeBowlingBall: function (e){
        var element=e.detail.target.el
        var elementHit=e.detail.body.el

        if (elementHit.id.includes("pin")) {
      
            //impulse and point vector
            var impulse = new CANNON.Vec3(0,1,-15);
            var worldPoint = new CANNON.Vec3().copy(
              elementHit.getAttribute("position")
            );
      
            elementHit.body.applyForce(impulse, worldPoint);
      
            //remove event listener
            element.removeEventListener("collide", this.removeBall);
      
            //remove the bullets from the scene
            var scene = document.querySelector("#scene");
            scene.removeChild(element);
          }
    }
})