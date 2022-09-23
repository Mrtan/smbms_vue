export const showInfoTip = ($event, status, info) => {
  let imgYes = `<img width='15px' src='/assets/images/y.png' />`;
  let imgNo = `<img width='15px' src='/assets/images/n.png' />`;

  let $element = $($event.target);
  if (status == 'info') {
    $element.next().css('color', '#666666');
    $element.next().html(info);
  } 
  if (status == 'error') {
    $element.next().css('color', 'red');
    $element.next().html(imgNo + info);
  }
  if (status == 'success') {
    $element.next().css('color', 'green');
    $element.next().html(imgYes + info);
  }
}