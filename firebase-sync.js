(function(){
  const cfg=window.TOTO_FIREBASE_CONFIG||{};
  let auth,db,user,mods,adminUser,listeners=[];
  const gameId='toto-diana';
  const safe=s=>String(s).replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,90);
  async function load(){
    if(!cfg.enabled||!cfg.firebase?.projectId)return false;
    const [app,authMod,firestore]=await Promise.all([
      import('https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js')
    ]);
    mods={...app,...authMod,...firestore};
    const firebaseApp=mods.initializeApp(cfg.firebase);
    auth=mods.getAuth(firebaseApp);db=mods.getFirestore(firebaseApp);
    await auth.authStateReady();user=auth.currentUser||(await mods.signInAnonymously(auth)).user;
    return true;
  }
  async function init(handlers={}){
    try{
      if(!await load())return {enabled:false};
      const predictions=mods.collection(db,'games',gameId,'predictions');
      listeners.push(mods.onSnapshot(predictions,snap=>{
        const rows={};snap.forEach(doc=>rows[doc.id]=doc.data());
        handlers.onPredictions?.(rows);
      }));
      const publicState=mods.doc(db,'games',gameId,'public','state');
      listeners.push(mods.onSnapshot(publicState,snap=>{if(snap.exists())handlers.onState?.(snap.data())}));
      return {enabled:true,uid:user.uid};
    }catch(error){console.warn('Firebase sync unavailable',error);handlers.onError?.(error);return {enabled:false,error}}
  }
  async function savePrediction(localKey,displayName,prediction){
    if(!db||!user)return false;
    const id=user.uid+'--'+safe(localKey);
    await mods.setDoc(mods.doc(db,'games',gameId,'predictions',id),{ownerUid:user.uid,localKey,displayName,prediction,updatedAt:mods.serverTimestamp()},{merge:true});
    return true;
  }
  async function adminSignIn(){
    if(!auth)return false;
    if(user&&!user.isAnonymous){adminUser=user;return true}
    const provider=new mods.GoogleAuthProvider();
    const result=await mods.signInWithPopup(auth,provider);
    adminUser=result.user;user=result.user;return true;
  }
  async function saveAdminState(settings,actual){
    if(!db||!adminUser)throw new Error('Accedi prima con l’account Google amministratore.');
    await mods.setDoc(mods.doc(db,'games',gameId,'public','state'),{settings,actual:actual||null,updatedAt:mods.serverTimestamp()},{merge:true});
    return true;
  }
  async function adminUpdatePrediction(id,prediction){
    if(!db||!adminUser)throw new Error('Accedi prima con l’account Google amministratore.');
    await mods.updateDoc(mods.doc(db,'games',gameId,'predictions',id),{prediction,updatedAt:mods.serverTimestamp()});
    return true;
  }
  window.TotoSync={enabled:!!cfg.enabled,init,savePrediction,adminSignIn,saveAdminState,adminUpdatePrediction};
})();
