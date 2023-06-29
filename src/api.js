export const fetchProfiles = async () => {
    const requestBody = JSON.stringify({
        query: `
          query {
            getAllProfiles {
              profiles {
                id
                first_name
                last_name
                email
                is_verified
                image_url
                description
              }
            }
          }
        `
    });

    try {
        const response = await fetch('https://api.poc.graphql.dev.vnplatform.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IkFudGhvbnkiLCJpc19jYW5kaWRhdGUiOnRydWUsImlhdCI6MTY4Nzg5NTIzMCwiZXhwIjoxNjg4NDEzNjMwfQ.FS9oH6MP_GoF5b3JjpubkyrSWq--N4gx9m414bxltJM`,
            },
            body: requestBody
        });
        const data = await response.json();
        const profiles = data.data.getAllProfiles.profiles

        return profiles;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};