// вершинный шейдер

// b - угол
// x' = x cos b - y sin b
// y' = x sin b + y cos b
// z' = z
var VSHADER_SOURCE = 
'attribute vec4 a_Position;\n' + 
'uniform float u_CosB , u_SinB;\n' + 
'void main() {\n' + 
'	gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n' + 
'	gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n' + 
'	gl_Position.z = a_Position.z;\n' + 
'	gl_Position.w = 1.0;\n' + 
'}\n';

// фрагментный шейдер
var FSHADER_SOURCE = 
'precision mediump float;\n' + 
'void main() {\n' + 
'	gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' + 
'}\n';

var ANGLE = 90;

function main() {
	var canvas = document.getElementById('example');
	var gl = getWebGLContext(canvas);
	initShaders(gl, VSHADER_SOURCE , FSHADER_SOURCE);
	
	var n = initVertexBuffers(gl);

	var radian = Math.PI * ANGLE / 180.0;
	var cosB = Math.cos(radian);
	var sinB = Math.sin(radian);

	var u_CosB = gl.getUniformLocation(gl.progam , 'u_CosB');
	var u_SinB = gl.getUniformLocation(gl.program , 'u_SinB');
	gl.uniform1f(u_CosB , cosB);
	gl.uniform1f(u_SinB , sinB);

	gl.clearColor(0.0 , 0.0 , 0.0 , 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES , 0 , n);
}

function initVertexBuffers(gl) {
	var verticles = new Float32Array([
		0.0 , 0.5 , -0.5 , -0.5 , 0.5 , -0.5
	]);
	var n = 3;

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER , vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER , verticles , gl.STATIC_DRAW);
	
	var a_Position = gl.getAttribLocation(gl.program , 'a_Position');
	
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(a_Position);

	return n;
}