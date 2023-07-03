const authKey = process.env.REACT_APP_VN_AUTH;

export const fetchProfiles = async (searchValue) => {
  const requestBody = JSON.stringify({
    query: `
query GetAllProfiles($orderBy: globalOrderBy, $searchString: String, $rows: Int, $page: Int) {
  getAllProfiles(orderBy: $orderBy, searchString: $searchString, rows: $rows, page: $page) {
    size
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
        `,
    variables: {
      orderBy: {
        key: 'is_verified',
        sort: 'desc',
      },
      searchString: searchValue,
      rows: 16,
    }
  });

  try {
    const response = await fetch('https://api.poc.graphql.dev.vnplatform.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authKey}`,
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

export const createProfile = async (createProfileData) => {
  try {
    const response = await fetch('https://api.poc.graphql.dev.vnplatform.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authKey}`,
      },
      body: JSON.stringify({
        query: `
          mutation CreateProfile($firstName: String!, $lastName: String!, $email: String!, $isVerified: Boolean!, $imageUrl: String!, $description: String!) {
            createProfile(first_name: $firstName, last_name: $lastName, email: $email, is_verified: $isVerified, image_url: $imageUrl, description: $description) {
              id
              first_name
              last_name
              email
              is_verified
              image_url
              description
            }
          }
        `,
        variables: {
          firstName: createProfileData.first_name,
          lastName: createProfileData.last_name,
          email: createProfileData.email,
          isVerified: createProfileData.is_verified,
          imageUrl: createProfileData.image_url,
          description: createProfileData.description,
        },
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

export const updateProfile = async (editProfileData) => {
  try {
    const response = await fetch('https://api.poc.graphql.dev.vnplatform.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authKey}`,
      },
      body: JSON.stringify({
        query: `
        mutation UpdateProfile($updateProfileId: String!, $firstName: String!, $lastName: String!, $email: String!, $isVerified: Boolean!, $imageUrl: String!, $description: String!) {
          updateProfile(id: $updateProfileId, first_name: $firstName, last_name: $lastName, email: $email, is_verified: $isVerified, image_url: $imageUrl, description: $description) {
            id
            first_name
            last_name
            email
            is_verified
            image_url
            description
          }
        }
        `,
        variables: {
          updateProfileId: editProfileData.id,
          firstName: editProfileData.first_name,
          lastName: editProfileData.last_name,
          email: editProfileData.email,
          isVerified: editProfileData.is_verified,
          imageUrl: editProfileData.image_url,
          description: editProfileData.description,
        },
      }),
    });

    const data = await response.json();
    return data.data.updateProfile;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const deleteProfile = async (deleteProfileData) => {
  try {
    const response = await fetch('https://api.poc.graphql.dev.vnplatform.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authKey}`,
      },
      body: JSON.stringify({
        query: `
        mutation DeleteProfile($deleteProfileId: String!) {
          deleteProfile(id: $deleteProfileId)
        }
        `,
        variables: {
          deleteProfileId: deleteProfileData.id,
        },
      }),
    });

    const data = await response.json();
    return data.data.updateProfile;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};
