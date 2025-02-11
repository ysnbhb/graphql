export const query = /*gql*/ `
{
    user{
        login
        firstName
        lastName
        totalDown
        totalUp
        totalUpBonus
        auditRatio
        transactions (where :{_and : [
        {type : {_eq :"level"}}
        {object :{type :{_eq :"project"}}}
        ]}
        limit : 1
        order_by : {amount :desc}
        ){
            amount
        }
        totalXp: transactions_aggregate(
              where: {
              _and: [
              { type: { _eq: "xp" } }
              {eventId : {_eq : "41"}}
        ]
        }
        ) {
        aggregate {
        sum {
            amount
            }
          }
          } 
        }
        transaction (where:{_and:[
            {type :{_eq :"xp"}}
             {object : {type : {_in :["project" , "piscine"]}}}
        ]}
            order_by :{createdAt :asc}
        ){
            amount
            object{
                name
            }
            createdAt
        }
      
    }
`;
