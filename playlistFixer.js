// ==UserScript==
// @name         Playlist user eject
// @namespace    bing bong
// @version      1
// @description  Auto Eject of user from playlist
// @author       Neo Sahadeo
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(
  function mainScript(){
    let cookieList=decodeURIComponent(document.cookie);
    let url = window.location.href;
    if(url.includes("&list=")){

      window.location.replace(url.slice(0,url.indexOf("&list=")));
    }

    function watchlaterButton(){
      const SettingButton = new Promise((resolve)=>
        document.getElementById('end').insertAdjacentHTML("afterbegin",`
        <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg" id="addedSettings" style="margin:20px;cursor:pointer">
          <rect x="0.5" y="0.5" width="23" height="16" stroke="white"/>
          <rect x="5" y="4" width="14" height="3" fill="white"/>
          <rect x="5" y="10" width="14" height="3" fill="white"/>
        </svg>`)
      );
      const svgSetColour=()=>{document.getElementById("addedSettings").style.filter="invert(32%) sepia(16%) saturate(4998%) hue-rotate(193deg) brightness(103%) contrast(105%)"};
      const svgUnsetColour=()=>{document.getElementById("addedSettings").style.filter=""};
      const watchLaterActive=()=>{
        let cookieList=decodeURIComponent(document.cookie);
        if((cookieList.indexOf("removeWatchLater"))>0){
          if(cookieList.search("removeWatchLater=false")>0){
            document.cookie="removeWatchLater=true";//sets true
            location.reload();
            svgSetColour();
          }else{
            document.cookie="removeWatchLater=false";//sets false
            svgUnsetColour();
          }
        }else{
          document.cookie="removeWatchLater=true";
          svgSetColour();
        }
      };
      const settingJSInserter=()=>{
        const addedSettings=document.getElementById("addedSettings");
        addedSettings.addEventListener("click",()=>{
          watchLaterActive();
        });
        cookieList=decodeURIComponent(document.cookie);
        if((cookieList.indexOf("removeWatchLater"))>0){
          if(cookieList.search("removeWatchLater=true")>0){
            svgSetColour();
            setTimeout(()=>{
              document.querySelector('[aria-label="Save to playlist"]').click();
            },1000);
            setTimeout(()=>{
              if(document.querySelectorAll('[class*="checked"]')[0]!=null){
                document.querySelector('#checkbox').click();
                document.querySelector('[aria-label="Save to playlist"]').click();
              }
              else{
                document.querySelector('[aria-label="Save to playlist"]').click();
              }
            },2000);
          }
        }
      }
      SettingButton
        .then(settingJSInserter())


  }
  window.addEventListener('load',()=>{
    watchlaterButton();
  });
  window.onfocus=()=>{
    if(document.getElementById('end').childElementCount!=3){
      location.reload()
    }
  };

}
)();
