---
title: "Research Note: monodromy operator"
date: 2025-08-21
categories:
  - Physics
tags:
  - monodromy operator
layout: protected
protected: true
password_hash: "efde1a862bf371c1778a71d1dd488800e262bb552a26523fa848f0f3b5dc1cdf"
excerpt: "Understand monodromy operator."
---


### Kontsevich-Soibelman Operator $\mathcal{O}(q)$

We focus on the Coulomb branch of a $4d$ $\mathcal{N}=2$ theory.
The physics at each point on the Coulomb branch is described by 
a $U(1)^r$ gauge theory.
The charges of the massive spectra of such a theory reside in an
integral lattice $\Gamma$ equipped with Dirac pairing $\langle\cdot, \cdot\rangle$.

The central charge $\mathcal{Z}$ for each fix vacuum is a complex-valued
linear function on $\Gamma$. The mass of a single particle of charge
$\gamma \in \Gamma$ is given by the formula

$$
M \geq|\mathcal{Z}(\gamma)|
$$

where the equality holds for BPS states.

For each $\gamma \in \Gamma$, we can define the protected spin-character

$$
\Omega(\gamma, y) = \sum_{n=0}^{\infty} \Omega_n(\gamma) y^n
$$

we ignore the precise definition of the protected spin-character 
at this stage. The quantities $\Omega_n(\gamma)$ are integers which 
encode the spin content of BPS particles of charge $\gamma$.
If $\gamma$ is not BPS, the protected spin-character can still be defined, but it will be trivial.

The protected spin-character is stable under small deformations in the moduli space.
But it might jump when crossing walls.

For each $\gamma \in \Gamma$, we introduce a formal variable $X_\gamma$. These variables obey a quantum torus algebra,

$$
X_\gamma X_{\gamma^{\prime}}=q^{\frac{\left\langle\gamma, \gamma^{\prime}\right\rangle}{2}} X_{\gamma+\gamma^{\prime}}=q^{\left\langle\gamma, \gamma^{\prime}\right\rangle} X_{\gamma^{\prime}} X_\gamma
$$

(TODO: geometric meaning of $X_\gamma$)
$q$ is a formal variable controlling the non-commutativity of the algebra.
We will see that $q$ is reinterpreted as the Schur index fugacity parameter. We also define a function, the $q$-exponential, as

$$
E_q(z)=\prod_{i=0}^{\infty}\left(1+q^{i+\frac{1}{2}} z\right)^{-1}=\sum_{n=0}^{\infty} \frac{\left(-q^{\frac{1}{2}} z\right)^n}{(q)_n}
$$

$z$ here can be formal operator. We have a remarkable identities
identities. 

$$
E_q\left(X_{\gamma_1}\right) E_q\left(X_{\gamma_2}\right)=E_q\left(X_{\gamma_2}\right) E_q\left(X_{\gamma_1+\gamma_2}\right) E_q\left(X_{\gamma_2}\right)
$$

for charges $\gamma_i$ with $\left\langle\gamma_1, \gamma_2\right\rangle=1$.

For each charge $\gamma \in \Gamma$ we build the following element of the quantum torus algebra using the $q$-exponential and the protected spin character 

$$
U_\gamma=\prod_{n \in \mathbb{Z}} E_q\left((-1)^n q^{n / 2} X_\gamma\right)^{(-1)^n \Omega_n(\gamma)}
$$

For the hypermultiplet, the only non-trivial protected spin character is$\Omega_0(\gamma) = 1$. Therefore, $U_\gamma$ reduces to $q$-exponentials.
Note that $U_\gamma$ will be trivial if $\gamma$ is not BPS.

The Kontsevich-Soibelman (KS) operator is defined by taking a product over all the $U_\gamma$

$$
\mathcal{O}(q) \equiv \prod_{\gamma \in \Gamma}^{\curvearrowright} U_\gamma
$$

Since the quantum torus algebra is non-commutative we must prescribe a specific order to the above product. This is achieved by ordering the phase of central charge. 

The important fact of Kontsevich-Soibelman (KS) operator is that, it is 
independent of the Coulomb branch vacuum.  Any quantity constructed out of $\mathcal{O}(q)$ has a chance to reproduce aspects of the quantum field theory defined at the origin of moduli space. We expect to get Schur index of origin SCFT from $\mathcal{O}(q)$.

One last definition is the monodromy operator $\mathcal{M}(q)$, it is related to the Kontsevich-Soibelman operator by

$$
\mathcal{O}(q)=M(q)^{-1}
$$

### Trace of $\mathcal{O}(q)$ and Schur Index

Flavor charges are elements of the charge lattice $\Gamma$ with trivial Dirac pairings. i.e. $\gamma$ is a flavor charge if and only if for all $\gamma^{\prime} \in \Gamma$ we have

$$
\left\langle\gamma, \gamma^{\prime}\right\rangle=0
$$

(TODO: Explain more about flavor charges)
In the language of the quantum torus algebra, if $\gamma$ is a flavor charge then the associated element $X_\gamma$ commutes with all other elements in the algebra, i.e. 
$X_\gamma$ is central.

The space of flavor charges forms a subspace of lattice $\Gamma$. 
Thus, pick an integral basis $\gamma_{f_i} \in \Gamma$ for the flavor charges. For a general element $X_\gamma$ we define

$$
\operatorname{Tr}\left[X_\gamma\right]= \begin{cases}\prod_i \operatorname{Tr}\left[X_{\gamma_{f_i}}\right] f_i(\gamma) & \left\langle\gamma, \gamma^{\prime}\right\rangle=0 \forall \gamma^{\prime} \in \Gamma, \\ 0 & \text { else },\end{cases}
$$

where $f_i(\gamma)$ are the flavor charges of $\gamma$. The above trace is a
function of the $n_f$ variables $\operatorname{Tr}\left[X_{\gamma_{f_i}}\right]$.

In particular, if there is no flavor charge for $\gamma$, we have

$$
\operatorname{Tr}\left[X_\gamma\right]= \begin{cases}1 & \gamma=0 \\ 0 & \text { else }\end{cases}
$$

We now connect the trace of $\mathcal{O}(q)$ to the flavor refined Schur index. 
The conjecture is

$$
\mathcal{I}\left(q, z_1, \cdots, z_n\right)=(q)_{\infty}^{2 r} \operatorname{Tr}[\mathcal{O}(q)]\left(\operatorname{Tr}\left[X_{\gamma_{f_1}}\right], \cdots, \operatorname{Tr}\left[X_{\gamma_{f_i}}\right]\right)
$$

The flavor fugacities $z_i$ in the index is related to traces of the flavor generators as

$$
\operatorname{Tr}\left[X_{\gamma_{f_i}}\right]=h_i\left(z_1, \cdots, z_{n_f}\right)
$$

for some specific functions $h_i(z)$, which are model (and basis) dependent.

### Examples

**U(1) vector multiplet** 
There are no massive BPS states, so the KS operator is trivial. We have

$$
\mathcal{I}^V(q)=(q)_{\infty}^2
$$

(TODO: Why only massive BPS states contributes to the KS operator?)

**Free Hypermultiplet**
For a free hypermultiplet, the theory has $SU(2)$ flavor symmetry.
The charge lattice $\Gamma$ of this theory is real and one-dimensional
corresponding to the $SU(2)$ flavor symmetry, the quantum torus 
algebra is commutative. The only BPS particle is the 
hypermultiplet state. 

(TODO: Can the hypermultiplet state be massless?)

If we denote the lattice vector of the hypermultiplet state by
$\gamma\in \Gamma$. $\gamma$ is the generator of $\Gamma$.

We define the fugacity $z$ by 

$$
\operatorname{Tr}\left[X_\gamma\right]=-z
$$

For the hypermultiplet state $U_\gamma = E_q(X_\gamma)$ 
The KS operator is given by

$$
\mathcal{O}(q)=E_q\left(X_{-\gamma}\right) E_q\left(X_\gamma\right)
$$


Its trace is obtained by replacing $X_\gamma$ by $-z$,

$$
\operatorname{Tr}[\mathcal{O}(q)]=E_q\left(-z^{-1}\right) E_q(-z)
$$

Using the identity

$$
E_q(-z):=\prod_{i=0}^{\infty}\left(1-q^{i+\frac{1}{2}} z\right)^{-1}=\exp \left[\sum_{n=1}^{\infty} \frac{1}{n} \frac{q^{\frac{n}{2}}}{1-q^n} z^n\right]
$$

we can rewrite the trace as

$$
\operatorname{Tr}[\mathcal{O}(q)]=\exp \left[\sum_{n=1}^{\infty} \frac{1}{n} \frac{q^{\frac{n}{2}}}{1-q^n}\left(z^n+z^{-n}\right)\right] .
$$

---

**References**

[1] C. Cordova and S.-H. Shao, "Schur Indices, BPS Particles, and Argyres-Douglas Theories," arXiv:1506.00265 [hep-th], 2015.

