using Application;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
     
     private readonly IMediator  _mediator;

        public ActivitiesController(IMediator  mediator)
        {
            _mediator = mediator;
        }

        [HttpGet] 

        public async Task<ActionResult<List<Activity>>> GetActivities (CancellationToken ct) {
            return await _mediator.Send(new List.Query(), ct);
        } 

        [HttpGet("{id}")] 

        public async Task<ActionResult<Activity>> GetActivity(Guid id) { 
          return await _mediator.Send(new Details.Query{Id = id});
        } 

        [HttpPost] 

        public async Task<IActionResult> CreateActivity(Activity activity ) 
        {
            await _mediator.Send(new Create.Command {Activity = activity});
            return Ok();
        } 

        [HttpPut("{id}")] 
         
         public async Task<IActionResult> EditActivity(Guid id, Activity activity) 
         {
            activity.Id = id; 
            
            await Mediator.Send(new Edit.Command {Activity = activity}); 

            return Ok();
         } 

         [HttpDelete("{id}")] 

         public async Task<IActionResult> DeleteActivity(Guid id)
         {
            await Mediator.Send(new Delete.Command {Id = id});
            return Ok();
         }
    }
}