BEGIN {
	state = 50;
	timesVisited0 = 0;
}

function countZeroHits(current, change) {
	absoluteChange = change < 0 ? -change : change;

	if (absoluteChange == 0) {
		return 0;
	}

	if (change > 0) {
		remainder = (100 - current) % 100;
	} else {
		remainder = current % 100;
	}

	firstHit = remainder == 0 ? 100 : remainder;

	if (absoluteChange < firstHit) {
		return 0;
	}

	remaining = absoluteChange - firstHit;

	return 1 + int(remaining / 100);
}

function turn(currentState, amount) {
	distance = amount % 100;
	newState = (currentState + distance) % 100;

	if (newState < 0) {
		newState += 100;
	}

	return newState;
}

/^(L|R)[0-9]+$/ {
	direction = substr($0, 1, 1);
	distance = substr($0, 2) + 0;

	if (direction == "L") {
		change = -distance;
	} else {
		change = distance;
	}

	timesVisited0 += countZeroHits(state, change);
	state = turn(state, change);
}

END {
	print "Result: " timesVisited0;
}
