BEGIN {
	state = 50;
	timesVisited0 = 0;
}

/^(L|R)[0-9]+$/ {
	direction = substr($0, 1, 1);
	distance = substr($0, 2) + 0;

	if (direction == "L") {
		state = (state - distance) % 100;
	} else if (direction == "R") {
		state = (state + distance) % 100;
	}

	if (state < 0) {
		state += 100;
	}

	if (state == 0) {
		timesVisited0++;
	}
}

END {
	print "Result: " timesVisited0;
}
