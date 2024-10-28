export default function Accordion() {
  return (
    <>
      <div className="collapse collapse-plus bg-base-200 mb-3">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-l font-medium">Contact</div>
        <div className="collapse-content">
          <div className="flex flex-col">
            <h2>contact info</h2>
            <div>
              <p>email: Gilded_Serpent@gmail.com</p>
              <p>bookings phone: 03459972622</p>
              <p>VIP phone: 03311406282</p>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-3">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-l font-medium">other inquiries</div>
        <div className="collapse-content">
          <p>other inquiries: 03173632442</p>
        </div>
      </div>
    </>
  );
}
