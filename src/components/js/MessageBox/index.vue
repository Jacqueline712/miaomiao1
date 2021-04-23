<template>
	<div class = "msgbox">
		<div class = "messageBox">
			<h2>{{title}}</h2>
			<p>{{content}}</p>
			<div>
				<div v-if = "cancel" @touchstart="handleCancel">{{cancel}}</div>
				<div v-if = "ok" @touchstart="handleOk">{{ok}}</div>
			</div>
		</div>
	</div>
	
</template>

<script>
export default{
	name:"MessageBox"
}
</script>

<style scoped>
	.msgbox-bounce-enter {
	  opacity: 0;
	  transform: translate3d(-50%, -50%, 0) scale(0.7);
	}
	.msgbox-bounce-leave-active {
	  opacity: 0;
	  transform: translate3d(-50%, -50%, 0) scale(0.9);
	}
	.messageBox{
		width:75%;
		height:135px;
		/* border:1px #ccc solid; */
		border-radius: 3px;
		font-size:16px;
		background:#fff;
		/* box-shadow:4px 4px 4px 4px #ccc; */
		box-shadow:0 1px 35px rgba(0, 0, 0, 0.3), 0 0 50px rgba(0, 0, 0, 0.1) ;
		position: fixed;
		left:50%;
		top:50%;
		transform: translate3d(-50%,-50%,0);
		font-family:Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
	}
	.messageBox h2{
		text-align: center;
		line-height:40px;
		font-size:18px;
		color:#333;
	}
	.messageBox p{
		text-align: center;
		line-height:40px;
		color:#999;
	}
	/* >号表示第一个div（外面的div） */
	.messageBox > div{
		display: flex;
		position: absolute;
		bottom:0;
		width:100%;
		border-top: 1px #ddd solid;
	}
	.messageBox > div div{
		/* 做弹性按钮 */
		flex:1;
		text-align: center;
		line-height: 40px;
		border-right: 1px #ccc solid;
	}
	.messageBox > div div:last-child{
		border: none;
		color:#26a2ff;
	}

</style>

 
 <!-- <style>
   @component-namespace mint {
     @component msgbox {
       position: fixed;
       top: 50%;
       left: 50%;
       transform: translate3d(-50%, -50%, 0);
       background-color: #fff;
       width: 85%;
       border-radius: 3px;
       font-size: 16px;
       -webkit-user-select: none;
       overflow: hidden;
       backface-visibility: hidden;
       transition: .2s;
 
       @descendent header {
         padding: 15px 0 0;
       }
 
       @descendent content {
         padding: 10px 20px 15px;
         border-bottom: 1px solid #ddd;
         min-height: 36px;
         position: relative;
       }
 
       @descendent input {
         padding-top: 15px;
         & input {
           border: 1px solid #dedede;
           border-radius: 5px;
           padding: 4px 5px;
           width: 100%;
           appearance: none;
           outline: none;
         }
         & input.invalid {
           border-color: #ff4949;
           &:focus {
             border-color: #ff4949;
           }
         }
       }
 
       @descendent errormsg {
         color: red;
         font-size: 12px;
         min-height: 18px;
         margin-top: 2px;
       }
 
       @descendent title {
         text-align: center;
         padding-left: 0;
         margin-bottom: 0;
         font-size: 16px;
         font-weight: bold;
         color: #333;
       }
 
       @descendent message {
         color: #999;
         margin: 0;
         text-align: center;
         line-height: 36px;
       }
 
       @descendent btns {
         display: -webkit-box;
         display: -webkit-flex;
         display: -ms-flexbox;
         display: flex;
         height: 40px;
         line-height: 40px;
       }
 
       @descendent btn {
         line-height: 35px;
         display: block;
         background-color: #fff;
         flex: 1;
         margin: 0;
         border: 0;
 
         &:focus {
           outline: none;
         }
 
         &:active {
           background-color: #fff;
         }
       }
 
       @descendent cancel {
         width: 50%;
         border-right: 1px solid #ddd;
         &:active {
           color: #000;
         }
       }
 
       @descendent confirm {
         color: #26a2ff;
         width: 50%;
         &:active {
          color: #26a2ff;
         }
       }
     }
   }
 
   .msgbox-bounce-enter {
     opacity: 0;
     transform: translate3d(-50%, -50%, 0) scale(0.7);
   }
   .msgbox-bounce-leave-active {
     opacity: 0;
     transform: translate3d(-50%, -50%, 0) scale(0.9);
   }
 </style> -->
 
 
 