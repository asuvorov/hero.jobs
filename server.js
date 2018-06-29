const cors = require("cors")
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

/*****************************************************************************/
/*** Middlewares.                                                          ***/
/*****************************************************************************/
app.use(cors());

/*****************************************************************************/
/*** Initials                                                              ***/
/*****************************************************************************/

/*****************************************************************************/
/*** Classes                                                               ***/
/*****************************************************************************/
class Bucket {
    // ========================================================================
    // === Constructor.
    constructor (nickname, capacity) {
        this.nickname = nickname;
        this.capacity = capacity;
        this.volume = 0;
    }

    // ========================================================================
    // === Getters.
    get availableVolume () {
        console.log("*** INSIDE : `availableVolume`");

        return this.capacity - this.volume;
    }

    get isFull () {
        console.log("*** INSIDE : `isFull`");

        return this.volume == this.capacity;
    }
    get isEmpty () {
        console.log("*** INSIDE : `isEmpty`");

        return this.volume == 0;
    }

    // ========================================================================
    // === Methods.
    fill () {
        console.log("*** INSIDE : `fill`");

        this.volume = this.capacity;
    }
    dump () {
        console.log("*** INSIDE : `dump`");

        this.volume = 0;
    }

    fillUp(volume) {
        console.log("*** INSIDE : `fillUp`");

        if (this.volume + volume > this.capacity) {
            this.volume = this.capacity;
        } else {
            this.volume += volume;
        }
    }
    poorOff (volume) {
        console.log("*** INSIDE : `poorOff`");

        if (this.volume - volume < 0) {
            this.volume = 0;
        } else {
            this.volume -= volume;
        }
    }
}

class Solution {
    constructor (volumeA, volumeX, volumeB) {
        this.solution = [];

        this.volumeA = volumeA;
        this.volumeX = volumeX;
        this.volumeB = volumeB;

        this.bucketA = new Bucket("Bucket A", volumeA);
        this.bucketB = new Bucket("Bucket B", volumeB);
    }

    // ========================================================================
    // === Main Methods.
    findSolutionRTL () {
        // ====================================================================
        // === Initials.
        this.solution = [];

        if (!this.bucketA.isEmpty)
            this.bucketA.dump();
        if (!this.bucketB.isEmpty)
            this.bucketB.dump();

        // ====================================================================
        // === Fill the Bucket B.
        this.fillBucket(this.bucketB);

        while (true) {
            if (this.bucketB.isEmpty)
                this.fillBucket(this.bucketB);

            this.transfer(
                this.bucketB,
                this.bucketA
            );

            if (this.isSolved)
                return this.solution;

            if (this.bucketA.isFull && !this.bucketB.isEmpty) {
                this.dumpBucket(this.bucketA);
                this.transfer(
                    this.bucketB,
                    this.bucketA
                );
            } else if (this.bucketA.isFull && this.bucketB.isEmpty) {
                return this.solution;
            }
        }

        return this.solution;
    }

    findSolutionLTR () {
        // ====================================================================
        // === Initials.
        this.solution = [];

        if (!this.bucketA.isEmpty)
            this.bucketA.dump();
        if (!this.bucketB.isEmpty)
            this.bucketB.dump();

        // ====================================================================
        // === Fill the Bucket A.
        this.fillBucket(this.bucketA);

        while (true) {
            if (!this.bucketA.isFull)
                this.fillBucket(this.bucketA);

            this.transfer(
                this.bucketA,
                this.bucketB
            );

            if (this.isSolved)
                return this.solution;

            if (!this.bucketA.isEmpty && this.bucketB.isFull) {
                this.dumpBucket(this.bucketB);
                this.transfer(
                    this.bucketA,
                    this.bucketB
                );
            } else if (this.bucketA.isEmpty && this.bucketB.isFull) {
                return this.solution;
            }
        }

        return this.solution;
    }

    // ========================================================================
    // === Getters.
    get isSolved () {
        return this.bucketB.volume == this.volumeX;
    }

    // ========================================================================
    // === Methods.
    fillBucket (bucket) {
        bucket.fill();

        this.solution.push({
            bucketA:    this.bucketA.volume,
            bucketB:    this.bucketB.volume,
            action:     "Filling up the " + bucket.nickname + ".",
        });
    }
    dumpBucket (bucket) {
        bucket.dump();

        this.solution.push({
            bucketA:    this.bucketA.volume,
            bucketB:    this.bucketB.volume,
            action:     "Dumping the " + bucket.nickname + ".",
        });
    }
    transfer (fromBucket, toBucket) {
        // === Check, if `toBucket` already full.
        var action = "",
            volume = 0;

        if (toBucket.isFull) return;

        // === Update Buckets.
        if (fromBucket.volume <= toBucket.availableVolume) {
            volume = fromBucket.volume;

            // === `toBucket` can accommodate the `fromBucket` Volume.
            action = "Transferring " + fromBucket.volume + " Gallons from " + fromBucket.nickname + " to " + toBucket.nickname + ".";

            toBucket.fillUp(volume);
            fromBucket.poorOff(volume);
        } else {
            volume = toBucket.availableVolume;

            // === `toBucket` can accommodate only available Volume.
            action = "Transferring " + toBucket.availableVolume + " Gallons from " + fromBucket.nickname + " to " + toBucket.nickname + ".";

            toBucket.fillUp(volume);
            fromBucket.poorOff(volume);
        }

        this.solution.push({
            bucketA:    this.bucketA.volume,
            bucketB:    this.bucketB.volume,
            action:     action,
        });
    }
}

/*****************************************************************************/
/*** Helpers                                                               ***/
/*****************************************************************************/

/*****************************************************************************/
/*** Routes                                                                ***/
/*****************************************************************************/
app.get("/api/v1/solution", (req, res) => {
    // === Initials.
    var upperLimit = 100;

    var message = "";

    var volumeA = parseInt(req.query.vola),
        volumeX = parseInt(req.query.volx),
        volumeB = parseInt(req.query.volb);

    // console.log(">>> ID : ", req.query.id);

    // === Data Validation.
    if (!Number.isInteger(volumeA) ||
        !Number.isInteger(volumeX) ||
        !Number.isInteger(volumeB)) {
        res.send({
            message:        "All Numbers should be Integers.",
            solutionRTL:    [],
            solutionLTR:    [],
        });
    }

    if (volumeA <= 0 ||
        volumeX <= 0 ||
        volumeB <= 0) {
        res.send({
            message:        "All Numbers should be greater, than 0.",
            solutionRTL:    [],
            solutionLTR:    [],
        });
    }

    if (volumeB > upperLimit) {
        res.send({
            message:        "Volume B CANNOT exceed " + upperLimit + " Gallons.",
            solutionRTL:    [],
            solutionLTR:    [],
        })
    }

    if (!(volumeA < volumeX) ||
        !(volumeX < volumeB)) {
        res.send({
            message:        "Volumes should be as follows: `volumeA < volumeX < volumeB`.",
            solutionRTL:    [],
            solutionLTR:    [],
        })
    }

    var quotient = Math.floor(volumeB / volumeA),
        remainder = volumeB % volumeA;
    var solutions;

    if (quotient == 2) {
        res.send({
            message:        "The Problem doesn't have a Solution.",
            solutionRTL:    [],
            solutionLTR:    [],
        });
    }

    if (quotient > 2 && remainder == 0) {
        solutions = quotient - 2;

        message += "The Problem has " + solutions + " discreet Solution(s). ";
    }

    console.log(">>> Quotient  : ", quotient);
    console.log(">>> Remainder : ", remainder);
    console.log(">>> Solutions : ", solutions);

    // ========================================================================
    // === Find the Solution.
    var findSolution = new Solution(volumeA, volumeX, volumeB);

    // === Right to Left Solution.
    var solutionRTL = findSolution.findSolutionRTL();

    // === Left to Right Solution.
    var solutionLTR = findSolution.findSolutionLTR();

    // ========================================================================
    // === Send the Response.
    if (findSolution.isSolved) {
        message += "The Solution has been found.";
    } else {
        message += "The Solution CANNOT be found.";
    }

    res.send({
        message:        message,
        solutionRTL:    solutionRTL,
        solutionLTR:    solutionLTR,
    });
});

/*****************************************************************************/
/*** Run server                                                            ***/
/*****************************************************************************/
app.listen(port, () => console.log(`Listening on port ${port}`));
