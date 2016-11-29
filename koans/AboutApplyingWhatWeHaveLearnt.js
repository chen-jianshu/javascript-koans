var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      // var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var productsICanEat = products.filter(function(product) {
        return product.containsNuts === false && _(product.ingredients).all(function(item) {
          return item !== "mushrooms";
        });
      });
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    //var sum = FILL_ME_IN;    /* try chaining range() and reduce() */
    /*function sumAll(minNum, maxNum, step) {
      return _.range(minNum, maxNum, step).reduce(function(prev, next) {
        return prev + next;
      });
    }
    var sum = sumAll(3, 1000, 3) + sumAll(5, 1000, 5) - sumAll(15, 1000, 15);
    */

    var sum = _.range(0, 1000).reduce(function(prev, next) {
      //doesn't work, why??????
      //return prev + (next%3 === 0 || next%5 ===0) ? next : 0;
      var n = (next%3 === 0 || next%5 ===0) ? next : 0;
      return prev + n;
    });
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products.map(function(product){
      return product.ingredients
    })).chain()
    .flatten()
    .reduce(function(sum, item){
      if (typeof(sum) === "string") {
        ingredientCount[sum] = 1;
      }
      ingredientCount[item] = (ingredientCount[item] || 0) + 1;
      return ingredientCount;
    })

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  function isPrime(num) {
    var maxNum = Math.sqrt(num);
    for(var i = 2; i <= maxNum; i++) {
      if (num%i === 0) {
        return false;
      }
    }
    return true;
  }

  it("should find the largest prime factor of a composite number", function () {
    var num = 600851475143;
    var largestPrime = 1;
    var factor = 2;
    while (num > 1) {
      if (num%factor === 0) {
        if (isPrime(factor))
          largestPrime = factor;
        num = num/factor;
        while (num%factor === 0) {
          num = num/factor;
        }
      }
      factor++;
    }
    expect(largestPrime).toBe(6857);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function isPalindrome(num) {
      var nString = num.toString();
      for (var i = 0; i < nString.length/2; i++) {
        if (nString.charAt(i) != nString.charAt(nString.length - 1 -i))
        {
          return false;
        }
      }
      return true;
    }

    var largestPalindrome = 0;
    var a = 999;
    while (a >= 100) {
      var b = 999;
      while (b >= a) {
        var product = a*b;
        if (product <= largestPalindrome)
          break;
        if (isPalindrome(product)) {
          largestPalindrome = product;
        }
        b--;
      }

      a--;
    }
    expect(largestPalindrome).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    // Find out greatest common divisor， lowest common multiple
    function gcd(a, b) {
      return b == 0?a:gcd(b, a%b);
    }
    function lcd(a, b) {
      return a*b/gcd(a,b);
    }

    var min = 2; 
    var max = 20;
    var result = min;
    for(var i = min; i <= max; i++) {
      result = lcd(result, i);
    }
    expect(result).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    // square(a+b+c) - (square(a) + square(b) + square(c)) = 2*(ab+bc+ac)
    var min = 1; 
    var max = 10;
    var result = Math.pow(_.range(1, max+1).reduce(function(prev, next) {
      return prev + next;
    }),2) - _.range(1, max+1).map(function(n) {
      return n*n
    }).reduce(function(prev, next) {
      return prev + next;
    })

    var diff = 0;
    for(var i = 1; i <= max; i++) {
      for(var j = 1; j <= max; j++) {
        if (i !== j) {
          diff = diff + i*j;
        }
      }
    }

    expect(result).toBe(2640);
    expect(diff).toBe(2640);
  });

  it("should find the 10001st prime", function () {

    // 2 is the first prime
    var num = 0;
    var i = 2;
    while(true) {
      if (isPrime(i)) {
        num++;
        if (num === 10001) {
          break;
        }
      }
      i++;
    }
    expect(i).toBe(104743);
  });
  
});
