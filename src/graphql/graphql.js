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
              {event:{object:{name:{_eq:"Module"}}}}
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
            {event:{object:{name:{_eq:"Module"}}}}
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
