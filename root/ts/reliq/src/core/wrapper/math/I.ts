

type I<T1 extends bigint, T2 extends bigint> = {

};


function I<T1 extends bigint, T2 extends bigint>(_min: T1, _max: T2): I<T1, T2> {

}

I(64n, 64n);

let x: I<-259999990n, 50000000000000000000000000000000000000000000000000000000000000000000000n>;