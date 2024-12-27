async function fetchData(method, action, id = '', body = null, requiresToken = true) {
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Ajoute le token si nécessaire
  if (requiresToken) {
    let token = localStorage.getItem('bearerToken');
    // console.log(token);
  
    if (!token) {
      throw new Error("Token non trouvé");
    }

    options.headers.Authorization = `Bearer ${token}`;
  }

  const url = `https://virtudev.ovh:8443/api/${action}${id ? `/${id}` : ''}`;

  // Ajoute le body seulement si la méthode est autre que GET/DELETE et s'il y a un body
  if (method !== 'GET' && method !== 'DELETE' && body) {
    options.body = JSON.stringify(body);
  }

  try {
    // Appel à fetch avec await
    const response = await fetch(url, options);

    // Vérifie si la réponse est OK
    if (!response.ok) {
      if (response.status == 403) {
        window.location.href = "/";
      }
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    // Gérer le cas où il n'y a pas de contenu (ex: statut 204 No Content)
    const contentType = response.headers.get('Content-Type');
    if (response.status === 204 || !contentType || !contentType.includes('application/json')) {
      return { success: true, data: null, errors: '', additional_data: null };
    }

    // Utilisation de async/await pour parser la réponse JSON
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erreur dans fetchData:', error);
    throw error;
  }
}

export default fetchData;
