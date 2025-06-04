export const config = {
    post_order: {
      apiUrl: 'https://simple-grocery-api.store/orders',
      token: '024fc92159de1b12afa5f28b1DUMMY21af17845c6241f770631909e5a66025bb5',
      payload: {
        cartId: 'SOv85Y1_hIlet4ap1vTfH',
        customerName: 'Error Facing User'
      }
    },
    response_time: {
        "fullCycle": __ENV.CI ? 8000 : 6000,
        "regular": __ENV.CI ? 1000 : 500
    }
  };
  