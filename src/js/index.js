import "../css/dark-theme.css";
import "../css/light-theme.css";
import "../js/main.js";
import "../json/data.json";
import "../../img/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg";
import "../../img/logo-trans.png";


document.getElementById("app").innerHTML = `
<body>
	<div id="add-modal" class="modal-container" style="display:none;">
		<div class="modal-content">
			<div class="flex">
				<div>Add user</div>
				<div class="close transition">&times;</div>
			</div>
			<div><input id="add-name" type="text" class="search-icon-glass border defaultFont margin"
					placeholder="Enter Name"></input></div>
			<div><input id="add-title" type="text" class="search-icon-glass border defaultFont margin"
					placeholder="Enter Title"></input></div>
			<div><select id="add-avatar" class="search-icon-glass border defaultFont margin">
					<option value="" disabled selected>Select Avatar</option>
					<option value="volvo">Volvo</option>
					<option value="saab">Saab</option>
					<option value="fiat">Fiat</option>
					<option value="audi">Audi</option>
				</select>
				<br><br>
				<button class="user-button transition">Submit</button>
			</div>
		</div>
	</div>
	<div id="del-modal" class="modal-container" style="display:none;">
		<div class="modal-content">
			<div class="flex">
				<div>Delete user</div>
				<div class="close transition">&times;</div>
			</div>
			<div>
				<select id="del-list" class="search-icon-glass border defaultFont margin">
					<option value="" disabled selected>Select User</option>
					<option value="volvo">Volvo</option>
					<option value="saab">Saab</option>
					<option value="fiat">Fiat</option>
					<option value="audi">Audi</option>
				</select>
				<br><br>
				<button class="user-button transition">Delete</button>
			</div>
		</div>
	</div>
	<div id="block-modal" class="modal-container" style="display:none;">
		<div class="modal-content">
			<div class="flex">
				<div>Block list</div>
				<div class="close transition">&times;</div>
			</div>
			<div>
				<select id="block-list" class="search-icon-glass border defaultFont margin">
					<option value="" disabled selected>Select user to unblock</option>
					<option value="volvo">Volvo</option>
					<option value="saab">Saab</option>
					<option value="fiat">Fiat</option>
					<option value="audi">Audi</option>
				</select>
				<br><br>
				<button class="user-button transition">Unblock</button>
			</div>
		</div>
	</div>
	<div id="change-theme" class="modal-container" style="display:none;">
		<div class="modal-content">
			<div class="flex">
				<div>Change theme</div>
				<div class="close transition">&times;</div>
			</div>
			<div>
				<div>
					<label><input id="light" type="radio" name="radio">Light</label>
				</div>
				<div>
					<label><input id="dark" type="radio" name="radio">Dark</label>
				</div>
				<br><br>
				<button id="submit-theme" class="user-button transition">Submit</button>
			</div>
		</div>
	</div>
	<div class="page-container">
		<header class="black">
			<nav class="arrow-container">
				<div class="nav-wrapper">
					<div class="logo"><img src="../../img/logo-trans.png" height="45" /></div>
					<div class="nav">
						<span>Menu</span>
						<span class="arrow-icon"></span>
					</div>
				</div>
				<div class="nav2">
					<ul>
						<li id="add-user">Add user</li>
						<li id="del-user">Delete user</li>
						<li id="block-user">Block list</li>
						<li id="change-theme">Change Theme</li>
					</ul>
				</div>
			</nav>
		</header>
		<div class="content-wrapper">
			<section>
				<div class="user-wrapper">
					<div class="user-container">
					</div>
				</div>
			</section>
		</div>
		<div id="noData" style="display:none;">
			<div class="user-wrapper user-container user-nodata">
				<strong> user name does not exist</strong>
			</div>
		</div>
		<footer>
			<div class="search-wrapper">
				<div class="search-container">
					<input id="searchField" type="text" onkeyup="filterFunction()"
						class="search-icon-glass border defaultFont" placeholder="Search contacts"><span
						class="fa fa-search search-icon-position" aria-hidden="true"></span></input>
				</div>
			</div>
		</footer>
	</div>

</body>
`;
