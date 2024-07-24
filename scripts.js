// The script to disable the selection and context menu on the page.
document.addEventListener('DOMContentLoaded', function()
{
	function disableMouse()
	{
		document.addEventListener('mousedown', preventDefault, false);
		document.addEventListener('selectstart', preventDefault, false);
		document.addEventListener('contextmenu', preventDefault, false);
	}
	function preventDefault(e)
	{
		e.preventDefault();
		e.stopPropagation();
	}
	disableMouse();
});